import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllProducts } from "@/lib/products";

export async function POST() {
  try {
    const products = getAllProducts();
    
    // Fetch all existing categories to map slugs to IDs
    const existingCategories = await prisma.category.findMany();
    const categoryMap = new Map(existingCategories.map((c) => [c.slug, c.id]));

    let created = 0;
    let updated = 0;

    for (const p of products) {
      if (!p.code || !p.category) continue; // skip if no code or category
      
      let categoryId = categoryMap.get(p.category);
      
      // If category doesn't exist, create it dynamically
      if (!categoryId) {
        const name = p.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const newCategory = await prisma.category.create({
          data: {
            name,
            slug: p.category,
            description: `Premium organic ${name} sourced naturally.`,
          }
        });
        categoryId = newCategory.id;
        categoryMap.set(p.category, categoryId);
      }
      
      const existing = await prisma.product.findUnique({
        where: { code: p.code }
      });

      if (existing) {
        await prisma.product.update({
          where: { code: p.code },
          data: {
            name: p.name,
            nepaliName: p.nepaliName,
            botanicalName: p.botanicalName,
            categoryId,
          }
        });
        updated++;
      } else {
        await prisma.product.create({
          data: {
            code: p.code,
            name: p.name,
            nepaliName: p.nepaliName,
            botanicalName: p.botanicalName,
            categoryId,
            description: p.description || null,
            hsCode: p.hsCode || null,
            barcode: p.barcode || null,
            rate: p.rate || null,
          }
        });
        created++;
      }
    }

    return NextResponse.json({ message: "Sync successful", created, updated });
  } catch (error) {
    console.error("Error syncing products:", error);
    return NextResponse.json(
      { error: "Failed to sync products" },
      { status: 500 }
    );
  }
}

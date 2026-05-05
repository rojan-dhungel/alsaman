import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const query: any = {};
    if (category) query.category = category;
    if (featured === "true") query.featured = true;

    const galleries = await prisma.gallery.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(galleries);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { error: "Title and Image URL are required" },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.create({
      data: {
        title: body.title,
        description: body.description || null,
        imageUrl: body.imageUrl,
        altText: body.altText || body.title,
        category: body.category || null,
        featured: body.featured || false,
      },
    });
    
    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

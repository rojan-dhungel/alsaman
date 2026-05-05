import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding data...');

  // 1. Seed SectionHeadings (Always Upsert)
  const headings = [
    {
      key: 'gallery',
      title: 'Our Journey',
      subtitle: 'Explore the story behind every product—from the fertile soils of Nepal to your international doorstep.'
    },
    {
      key: 'products',
      title: 'Global Catalog',
      subtitle: 'Handpicked from High-Altitude Nepal—Premium Organic Products.'
    },
    {
      key: 'about',
      title: 'Our Story',
      subtitle: 'Al Saman Global is a business group established in 2018, connecting the organic riches of Nepal to the world.'
    }
  ];

  for (const h of headings) {
    await prisma.sectionHeading.upsert({
      where: { key: h.key },
      update: { title: h.title, subtitle: h.subtitle },
      create: h,
    });
  }

  // 2. Seed AboutContent
  await prisma.aboutContent.upsert({
    where: { id: 'default-about' },
    update: {},
    create: {
      id: 'default-about',
      title: 'About Alsaman',
      subtitle: 'Premium Organic Products',
      content: 'We provide high-quality organic products sourced directly from local farmers in Nepal. Our commitment is to bring the best of nature to you.',
      imageUrl: 'https://via.placeholder.com/800x600?text=About+Alsaman',
      order: 1,
      isActive: true,
    },
  });

  // 3. Seed WorkflowStep
  const steps = [
    { title: 'Sourcing', description: 'We carefully source raw materials from sustainable farms.', stepNumber: 1, isActive: true },
    { title: 'Processing', description: 'The materials are processed using state-of-the-art facilities.', stepNumber: 2, isActive: true },
    { title: 'Packaging', description: 'Products are packaged to ensure maximum freshness and quality.', stepNumber: 3, isActive: true },
  ];

  for (const s of steps) {
    await prisma.workflowStep.upsert({
      where: { id: `step-${s.stepNumber}` },
      update: s,
      create: { id: `step-${s.stepNumber}`, ...s },
    });
  }

  // 4. Seed Categories and Products
  console.log('Fetching products from lib...');
  const { getAllProducts } = require('../lib/products');
  const allProducts = getAllProducts();
  console.log(`Found ${allProducts.length} products to seed.`);
  
  const uniqueCategories = [...new Set(allProducts.map((p: any) => p.category))] as string[];
  console.log(`Found ${uniqueCategories.length} unique categories.`);
  
  const categoryMap: Record<string, string> = {};
  
  for (const catSlug of uniqueCategories) {
    const name = catSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const category = await prisma.category.upsert({
      where: { slug: catSlug },
      update: { name },
      create: {
        name,
        slug: catSlug,
        description: `Premium organic ${name} sourced naturally.`,
      }
    });
    categoryMap[catSlug] = category.id;
  }
  
  // Seed Products in Batches
  const batchSize = 50;
  for (let i = 0; i < allProducts.length; i += batchSize) {
    const batch = allProducts.slice(i, i + batchSize);
    for (const p of batch) {
        await prisma.product.upsert({
            where: { code: p.code },
            update: {
                name: p.name,
                nepaliName: p.nepaliName,
                botanicalName: p.botanicalName,
                categoryId: categoryMap[p.category],
                description: p.description,
                hsCode: p.hsCode,
                barcode: p.barcode,
                rate: p.rate,
            },
            create: {
                code: p.code,
                name: p.name,
                nepaliName: p.nepaliName,
                botanicalName: p.botanicalName,
                categoryId: categoryMap[p.category],
                description: p.description,
                hsCode: p.hsCode,
                barcode: p.barcode,
                rate: p.rate,
            }
        });
    }
  }

  // 5. Seed Gallery 
  const galleryItems = [
    {
      title: 'Farm View',
      description: 'A view of our organic farm.',
      imageUrl: 'https://via.placeholder.com/800x600?text=Farm+View',
      category: 'farm',
      featured: true,
    },
    {
      title: 'Honey Processing',
      description: 'Extracting pure organic honey.',
      imageUrl: 'https://via.placeholder.com/800x600?text=Honey+Processing',
      category: 'products',
      featured: false,
    },
  ];

  for (const item of galleryItems) {
    await prisma.gallery.upsert({
        where: { id: `gallery-${item.title.toLowerCase().replace(/\s+/g, '-')}` },
        update: item,
        create: { id: `gallery-${item.title.toLowerCase().replace(/\s+/g, '-')}`, ...item }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contents = await prisma.aboutContent.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error fetching about contents:", error);
    return NextResponse.json({ error: "Failed to fetch about contents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const content = await prisma.aboutContent.create({
      data: {
        title: body.title,
        subtitle: body.subtitle || null,
        content: body.content,
        imageUrl: body.imageUrl || null,
        order: body.order || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });
    
    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error("Error creating about content:", error);
    return NextResponse.json({ error: "Failed to create about content" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const content = await prisma.aboutContent.findUnique({
      where: { id },
    });
    
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching about content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const content = await prisma.aboutContent.update({
      where: { id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        imageUrl: body.imageUrl,
        order: body.order,
        isActive: body.isActive,
      },
    });
    
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating about content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.aboutContent.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting about content:", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}

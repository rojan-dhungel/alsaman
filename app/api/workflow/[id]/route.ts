import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const step = await prisma.workflowStep.findUnique({
      where: { id },
    });
    
    if (!step) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 });
    }
    
    return NextResponse.json(step);
  } catch (error) {
    console.error("Error fetching workflow step:", error);
    return NextResponse.json({ error: "Failed to fetch step" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const step = await prisma.workflowStep.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        stepNumber: body.stepNumber,
        isActive: body.isActive,
      },
    });
    
    return NextResponse.json(step);
  } catch (error) {
    console.error("Error updating workflow step:", error);
    return NextResponse.json({ error: "Failed to update step" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.workflowStep.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Step deleted successfully" });
  } catch (error) {
    console.error("Error deleting workflow step:", error);
    return NextResponse.json({ error: "Failed to delete step" }, { status: 500 });
  }
}

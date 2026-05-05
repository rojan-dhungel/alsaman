import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const steps = await prisma.workflowStep.findMany({
      orderBy: { stepNumber: "asc" },
    });
    return NextResponse.json(steps);
  } catch (error) {
    console.error("Error fetching workflow steps:", error);
    return NextResponse.json({ error: "Failed to fetch workflow steps" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const step = await prisma.workflowStep.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl || null,
        stepNumber: body.stepNumber || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });
    
    return NextResponse.json(step, { status: 201 });
  } catch (error) {
    console.error("Error creating workflow step:", error);
    return NextResponse.json({ error: "Failed to create workflow step" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });
    
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error fetching contact message:", error);
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const message = await prisma.contactMessage.update({
      where: { id },
      data: {
        isRead: body.isRead,
      },
    });
    
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error updating contact message:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contactMessage.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}

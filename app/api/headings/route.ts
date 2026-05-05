import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const heading = await prisma.sectionHeading.findUnique({
        where: { key },
      });
      return NextResponse.json(heading);
    }

    const headings = await prisma.sectionHeading.findMany();
    return NextResponse.json(headings);
  } catch (error) {
    console.error("Error fetching headings:", error);
    return NextResponse.json({ error: "Failed to fetch headings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, title, subtitle } = body;

    if (!key || !title) {
      return NextResponse.json({ error: "Key and Title are required" }, { status: 400 });
    }

    const heading = await prisma.sectionHeading.upsert({
      where: { key },
      update: { title, subtitle },
      create: { key, title, subtitle },
    });

    return NextResponse.json(heading);
  } catch (error) {
    console.error("Error updating heading:", error);
    return NextResponse.json({ error: "Failed to update heading" }, { status: 500 });
  }
}

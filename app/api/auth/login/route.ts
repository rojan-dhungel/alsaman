import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Temporary credentials as requested
    if (username === "admin" && password === "admin123") {
      const response = NextResponse.json({ success: true });
      
      // Set a simple secure cookie for demonstration
      response.cookies.set({
        name: 'adminAuth',
        value: 'authenticated',
        httpOnly: false, // Set to false so we can clear it from client-side on logout for simplicity
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

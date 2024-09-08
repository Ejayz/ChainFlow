import { NextRequest, NextResponse } from "next/server";

export default function GET(req: Request) {
  return NextResponse.json({ message: "This is a protected route" });
}

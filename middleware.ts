import { NextRequest, NextResponse } from "next/server";

export default function RoutesMiddleWare(request: NextRequest) {

  if (request.nextUrl.pathname.includes("home")) {
    return NextResponse.redirect("https://www.google.com");
  }
}
export const config = {
  matcher: "/:path*", // This will apply the middleware to all routes
};

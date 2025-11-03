import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (!session || !session.user)
    return NextResponse.redirect(new URL("/auth/signin", request.url));
}

//this middleware will run only on these routes
export const config = {
  matcher: "/user/:path*",
};

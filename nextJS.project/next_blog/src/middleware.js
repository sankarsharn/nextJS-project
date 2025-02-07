import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default function middleware(req) {
    const { pathname } = req.nextUrl;

    // ✅ Allow API routes
    if (pathname.startsWith("/api/")) {
        console.log('✅ API route allowed:', pathname);
        return NextResponse.next();
    }

    return clerkMiddleware()(req);
}

export const config = {
    matcher: "/((?!api|_next|.*\\..*).*)",
};

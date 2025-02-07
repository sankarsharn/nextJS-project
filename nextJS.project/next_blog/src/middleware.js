import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow all API routes without authentication
    if (pathname.startsWith("/api/")) {
        return NextResponse.next(); // ✅ This ensures API routes work
    }

    // Apply Clerk middleware for all non-API routes
    return clerkMiddleware()(req);
}

// Ensure the matcher allows API routes
export const config = {
    matcher: "/((?!_next|.*\\..*).*)", // ✅ This prevents blocking /api/*
};

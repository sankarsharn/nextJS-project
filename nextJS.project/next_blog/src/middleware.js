import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow public access to all API routes
    if (pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    return clerkMiddleware({
        signInUrl: "/sign-in",
        signUpUrl: "/sign-up",
        afterSignUpUrl: "/",
        afterSignInUrl: "/",
    })(req);
}

// Apply middleware only to specific routes
export const config = {
    matcher: "/((?!api|_next|.*\\..*).*)",
};

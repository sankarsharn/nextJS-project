import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  afterSignUpUrl: "/",
  afterSignInUrl: "/",
});

// Match all routes
export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};

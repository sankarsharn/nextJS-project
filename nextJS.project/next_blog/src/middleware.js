import { clerkMiddleware } from "@clerk/nextjs";

export default clerkMiddleware((auth, req) => {
    return auth().protect({
        publicRoutes: ["/", "/api/webhooks"],
    });
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

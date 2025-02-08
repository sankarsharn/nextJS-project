import { clerkMiddleware } from "@clerk/nextjs";

export default clerkMiddleware((auth, req) => {
    try {
        const authObject = auth();
        console.log("Auth Object:", authObject);
        
        return authObject.protect({
            publicRoutes: ["/", "/api/webhooks"],
        });
    } catch (error) {
        console.error("Clerk Middleware Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

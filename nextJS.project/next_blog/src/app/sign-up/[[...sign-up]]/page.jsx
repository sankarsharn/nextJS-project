import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="mt-10 flex items-center justify-center">
            <SignUp 
                afterSignUpUrl="/"  // Redirect to home after sign-up
                mode="modal"        // Prevents full-page redirect
            />
        </div>
    );
}

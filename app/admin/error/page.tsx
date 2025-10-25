"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "You do not have permission to sign in. Only authorized administrators can access this area.";
      case "Verification":
        return "The verification token has expired or has already been used.";
      case "OAuthSignin":
        return "Error in constructing an authorization URL.";
      case "OAuthCallback":
        return "Error in handling the response from the OAuth provider.";
      case "OAuthCreateAccount":
        return "Could not create OAuth provider user in the database.";
      case "EmailCreateAccount":
        return "Could not create email provider user in the database.";
      case "Callback":
        return "Error in the OAuth callback handler route.";
      case "OAuthAccountNotLinked":
        return "This email is already associated with another account.";
      case "EmailSignin":
        return "The email could not be sent.";
      case "CredentialsSignin":
        return "Sign in failed. Check the details you provided are correct.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "An unexpected error occurred during authentication.";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping" />
          <div className="relative bg-amber-500/10 rounded-full w-24 h-24 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-amber-500" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-urbanist font-bold text-foreground">
            Authentication Error
          </h1>
          <p className="text-muted-foreground">
            {getErrorMessage()}
          </p>
          {error === "AccessDenied" && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                If you should have access, please contact your administrator to add your email to the authorized list.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            asChild
          >
            <Link href="/admin/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            asChild
          >
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <a href="mailto:admin@homelink.co.id" className="text-brand-gold hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

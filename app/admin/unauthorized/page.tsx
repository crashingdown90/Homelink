import Link from "next/link";
import { ShieldOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
          <div className="relative bg-red-500/10 rounded-full w-24 h-24 flex items-center justify-center">
            <ShieldOff className="h-12 w-12 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-urbanist font-bold text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this area. This section is restricted to authorized administrators only.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{" "}
            <a href="mailto:admin@homelink.co.id" className="text-brand-gold hover:underline">
              contact support
            </a>
          </p>
        </div>

        {/* Additional info */}
        <div className="pt-6 border-t">
          <p className="text-xs text-muted-foreground">
            Your login attempt has been logged for security purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Loader } from "lucide-react";

export default function LogoutPage() {
  useEffect(() => {
    // Sign out and redirect to home
    signOut({
      callbackUrl: "/",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader className="h-8 w-8 animate-spin text-brand-gold mx-auto" />
        <p className="text-muted-foreground">Signing out...</p>
      </div>
    </div>
  );
}

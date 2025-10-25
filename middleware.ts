import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware to protect admin routes
export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        
        // Check if user is authenticated
        if (!token) {
          return false;
        }
        
        // Check if user is admin
        const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
        return adminEmails.includes(token.email as string);
      },
    },
    pages: {
      signIn: "/admin/login",
      error: "/admin/error",
    },
  }
);

// Configure which routes to protect - only protect admin routes
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};

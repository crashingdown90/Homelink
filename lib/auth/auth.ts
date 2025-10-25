import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-config";
import { redirect } from "next/navigation";
import type { Session, DefaultSession } from "next-auth";

// Extend the Session type to include role
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: "admin" | "user";
    } & DefaultSession["user"];
  }
}

/**
 * Get the current session on the server
 */
export async function getCurrentSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user;
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

/**
 * Require authentication for a page
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await getCurrentSession();
  
  if (!session) {
    redirect("/admin/login");
  }
  
  return session;
}

/**
 * Require admin role for a page
 * Redirects to login or unauthorized if not admin
 */
export async function requireAdmin() {
  const session = await requireAuth();
  
  if (session.user?.role !== "admin") {
    redirect("/admin/unauthorized");
  }
  
  return session;
}

/**
 * Check if an email is in the admin list
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
  return adminEmails.includes(email);
}

/**
 * Get all admin emails
 */
export function getAdminEmails(): string[] {
  return process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
}

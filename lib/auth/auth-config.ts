import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const isDevelopment = process.env.NODE_ENV === 'development';
const hasGoogleCredentials = process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id';

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth (only if configured)
    ...(hasGoogleCredentials ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      })
    ] : []),
    
    // Development-only: Simple credentials login
    ...(isDevelopment ? [
      CredentialsProvider({
        id: "credentials",
        name: "Development Login",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "admin@homelink.co.id" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          try {
            // Development login - accept any admin email
            const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [
              "admin@homelink.co.id"
            ];
            
            console.log('[Auth] Attempting login:', credentials?.email);
            console.log('[Auth] Admin emails:', adminEmails);
            
            if (credentials?.email && adminEmails.includes(credentials.email)) {
              // Return user object for development
              const user = {
                id: "dev-admin-" + Date.now(),
                email: credentials.email,
                name: "Admin Development",
                image: null,
              };
              console.log('[Auth] Login successful:', user.email);
              return user;
            }
            
            console.log('[Auth] Login failed: Email not in admin list');
            return null;
          } catch (error) {
            console.error('[Auth] Error during authorization:', error);
            return null;
          }
        }
      })
    ] : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('[Auth] signIn callback:', { email: user.email, account: account?.provider });
      
      // For credentials provider, always allow (already validated in authorize)
      if (account?.provider === "credentials") {
        return true;
      }
      
      // For Google OAuth, check if user email is in admin list
      const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
      
      if (user.email && adminEmails.includes(user.email)) {
        return true;
      }
      
      // Deny access for non-admin OAuth users
      return false;
    },
    async jwt({ token, user, account, trigger }) {
      console.log('[Auth] jwt callback:', { email: token.email, trigger });
      
      // Add user data to token on sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        
        // Set role based on admin emails
        const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [
          "admin@homelink.co.id"
        ];
        token.role = user.email && adminEmails.includes(user.email) ? "admin" : "user";
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log('[Auth] session callback:', { email: token.email });
      
      // Add user data to session
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as "admin" | "user";
      }
      
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: isDevelopment, // Enable debug logs in development
};

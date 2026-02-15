import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"
import { registerUser } from "@/app/apis/AuthApi"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/',
    error: '/', // Redirect errors back to home page
  },
  callbacks: {
    async signIn({ user, account }) {
      // Call the register endpoint when a user signs in with Google
      if (account?.provider === "google" && user.email && user.name) {
        try {
          await registerUser(user.email, user.name);
          return true;
        } catch (error) {
          console.error("Failed to register user:", error);
          // Block sign-in if registration fails
          return false;
        }
      }
      return true;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

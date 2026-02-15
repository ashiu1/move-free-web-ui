import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { registerUser, loginUser } from '@/app/apis/AuthApi';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/',
    error: '/', // Redirect errors back to home page
  },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google authentication - supports both login and signup
      if (account?.provider === 'google' && user.email && user.name) {
        // TODO: This seems wrong, login or signup should be passed in as a param instead of try catching
        try {
          // Try to login first (existing user)
          let result;
          try {
            result = await loginUser(user.email);
          } catch (loginError) {
            // User doesn't exist, register them (new user)
            result = await registerUser(user.email, user.name);
          }

          // Store the Supabase user ID on the user object
          user.userId = result.id;
          return true;
        } catch (error) {
          console.error('Failed to authenticate user:', error);
          // Block sign-in if both login and registration fail
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // Add user ID to JWT token when user signs in
      if (user?.userId) {
        token.userId = user.userId;
      }
      return token;
    },

    async session({ session, token }) {
      // Add user ID from JWT to session object
      if (token.userId && session.user) {
        session.user.userId = token.userId;
        session.user.id = token.userId;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

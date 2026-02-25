import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { createClient } from '@/app/utils/supabase/server';

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
      // Handle Google authentication with Supabase
      if (account?.provider === 'google' && account.id_token) {
        try {
          const supabase = await createClient();

          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: account.id_token,
          });

          if (error) {
            return false;
          }

          if (data.user) {
            user.userId = data.user.id;
            return true;
          }

          return false;
        } catch (error) {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user?.userId) {
        token.userId = user.userId;
      }
      return token;
    },

    async session({ session, token }) {
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

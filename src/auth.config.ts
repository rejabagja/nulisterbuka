import type { NextAuthConfig, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    email: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
  }
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }
}

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn && ['/signin', '/signup'].includes(nextUrl.pathname)) {
        return Response.redirect(new URL('/', nextUrl));
      }
      if (
        !isLoggedIn &&
        (nextUrl.pathname === '/dashboard' ||
          nextUrl.pathname.startsWith('/dashboard'))
      ) {
        return false;
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

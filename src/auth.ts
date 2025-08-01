import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async ({ email, password }) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          });
          if (!user) {
            return null;
          } else {
            const isMatch = await bcrypt.compare(
              password as string,
              user.password
            );
            if (!isMatch) {
              return null;
            }
          }
          console.log('User authenticated:', user);
          return user;
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
});

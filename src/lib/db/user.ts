import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function getUserFromDB(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new Error('Invalid credentials');
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

'use server';

import bcrypt from 'bcrypt';
import { prisma, Prisma } from '@/lib/prisma';

interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
}

export type RegisterUserResponse = {
  status: 'success' | 'fail' | undefined;
  message: string;
};
export async function registerUser(
  payload: RegisterUserPayload
): Promise<RegisterUserResponse> {
  const { username, email, password } = payload;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: 'success',
      message: 'Registrasi berhasil, silahkan login',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Error during registration:', error.code, error.message);
      if (error.code === 'P2002') {
        return {
          status: 'fail',
          message: 'Email sudah terdaftar, silahkan login',
        };
      }
    }
    return {
      status: 'fail',
      message: 'Registrasi gagal, terjadi kesalahan',
    };
  }
}

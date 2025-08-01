'use server';

import bcrypt from 'bcrypt';
import { prisma, Prisma } from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
}

export type AuthUserResponse = {
  status: 'success' | 'fail' | undefined;
  message: string;
};
export async function registerUser(
  payload: RegisterUserPayload
): Promise<AuthUserResponse> {
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

export async function authenticateUser(
  payload: Omit<RegisterUserPayload, 'username'> & { redirectTo?: string }
): Promise<AuthUserResponse> {
  try {
    const { email, password } = payload;
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return {
      status: 'success',
      message: 'Login berhasil, mengarahkan ke halaman utama...',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Error during login:', error.type, error.message);
      if (error.type === 'CredentialsSignin') {
        return {
          status: 'fail',
          message: 'Email atau password salah',
        };
      }
    }
    return {
      status: 'fail',
      message: 'Login gagal, terjadi kesalahan',
    };
  }
}

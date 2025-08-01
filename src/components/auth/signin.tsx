'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import FormLogin from './form-login';

interface LoginProps {
  heading?: string;
  subheading?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login = ({
  heading = 'Login',
  subheading = 'Masuk ke akun kamu',
  signupText = 'Need an account?',
  signupUrl = '',
}: LoginProps) => {
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <Link href={'/'}>
            <h1 className="text-2xl font-semibold font-serif">nulisterbuka.</h1>
          </Link>
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            <div className="text-center">
              {heading && (
                <h1 className="text-xl font-semibold flex items-center gap-2 mb-1">
                  <LogIn className="size-6" />
                  {heading}
                </h1>
              )}
              {subheading && (
                <p className="text-sm text-muted-foreground">{subheading}</p>
              )}
            </div>
            <div className="w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <FormLogin />
              </Suspense>
            </div>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

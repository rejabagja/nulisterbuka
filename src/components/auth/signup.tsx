'use client';

import { ClipboardPen } from 'lucide-react';
import Link from 'next/link';
import FormRegister from './form-register';

interface RegisterProps {
  heading?: string;
  subheading?: string;
  googleText?: string;
  signinText?: string;
  signinUrl?: string;
}

const Register = ({
  heading = 'Register',
  subheading = 'Daftarkan akun kamu',
  signinText = 'Already have an account?',
  signinUrl = '',
}: RegisterProps) => {
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
                  <ClipboardPen className="size-6" />
                  {heading}
                </h1>
              )}
              {subheading && (
                <p className="text-sm text-muted-foreground">{subheading}</p>
              )}
            </div>
            <div className="w-full">
              <FormRegister />
            </div>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signinText}</p>
            <Link
              href={signinUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

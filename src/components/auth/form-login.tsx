'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { authenticateUser, AuthUserResponse } from '@/actions/auth';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2Icon, AlertCircleIcon } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Inputs = {
  email: string;
  password: string;
  redirectTo: string;
};

export default function FormLogin() {
  const searchParams = useSearchParams();
  const { update } = useSession();
  const router = useRouter();
  const callbackURL = searchParams.get('callbackUrl') || '/';
  const [loginStatus, setLoginStatus] = useState<AuthUserResponse>({
    status: undefined,
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoginStatus({ status: undefined, message: '' });
    setIsLoading(true);
    const response = await authenticateUser(data);
    setLoginStatus(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (loginStatus?.status === 'success') {
      setTimeout(() => {
        update();
        router.replace(callbackURL);
      }, 1000);
    }
  }, [loginStatus, callbackURL, update, router]);
  return (
    <>
      {loginStatus?.status && (
        <Alert
          className={cn(
            'text-sm rounded mb-4',
            loginStatus.status === 'success'
              ? 'text-green-700 bg-green-100'
              : 'text-red-500 bg-red-100'
          )}
        >
          {loginStatus.status === 'success' ? (
            <CheckCircle2Icon />
          ) : (
            <AlertCircleIcon />
          )}
          <AlertTitle>{loginStatus.message}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            className="text-sm"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p role="alert" className="text-red-500 text-sm ml-2 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            className="text-sm"
            {...register('password', {
              required: 'Password is required',
            })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <p role="alert" className="text-red-500 text-sm ml-2 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </>
  );
}

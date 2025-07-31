'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { registerUser, RegisterUserResponse } from '@/actions/auth';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2Icon, AlertCircleIcon } from 'lucide-react';

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function FormRegister() {
  const [registerStatus, setRegisterStatus] = useState<RegisterUserResponse>({
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
    setRegisterStatus({ status: undefined, message: '' });
    setIsLoading(true);
    const response = await registerUser(data);
    setRegisterStatus(response);
    setIsLoading(false);
  };
  return (
    <>
      {registerStatus?.status && (
        <Alert
          className={cn(
            'text-sm rounded mb-4',
            registerStatus.status === 'success'
              ? 'text-green-700 bg-green-100'
              : 'text-red-500 bg-red-100'
          )}
        >
          {registerStatus.status === 'success' ? (
            <CheckCircle2Icon />
          ) : (
            <AlertCircleIcon />
          )}
          <AlertTitle>{registerStatus.message}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            className="text-sm"
            {...register('username', { required: 'Username is required' })}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username && (
            <p role="alert" className="text-red-500 text-sm ml-2 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
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
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
              },
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
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </>
  );
}

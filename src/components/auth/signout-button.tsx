'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function SignoutButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const handleSignout = async () => {
    try {
      toast('Keluar akun...', {
        duration: 1500,
        position: 'top-center',
      });
      await signOut({ callbackUrl: '/signin' });
    } catch (error) {
      toast.error('Failed to sign out', {
        position: 'top-center',
      });
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant: props.variant }), className)}
          {...props}
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Apakah kamu yakin ingin keluar akun?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Kamu akan keluar dari akun kamu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignout}>Iya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

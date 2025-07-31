import Signup from '@/components/auth/signup';

export default function SigninPage() {
  return (
    <div>
      <Signup
        heading="Sign up"
        signinUrl="/signin"
        signinText="Sudah Punya Akun?"
      />
    </div>
  );
}

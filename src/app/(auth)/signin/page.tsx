import Signin from '@/components/auth/signin';

export default function SigninPage() {
  return (
    <div>
      <Signin
        heading="Sign in"
        signupUrl="/signup"
        signupText="Belum Punya Akun?"
      />
    </div>
  );
}

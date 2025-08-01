import { auth } from '@/auth';
import SignoutButton from '@/components/auth/signout-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className="pt-16 h-screen">
      <div className="container py-20 flex justify-center">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Informasi Akun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-gray-600">
              <p className="text-base">Username: {session?.user?.username}</p>
              <p className="text-base">Email: {session?.user?.email}</p>
            </div>
            <SignoutButton className="w-full rounded-[0px] mt-3">
              Sign out
            </SignoutButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

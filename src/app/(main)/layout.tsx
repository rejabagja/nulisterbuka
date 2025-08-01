import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { auth } from '@/auth';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen">
      <Header session={session} />
      {children}
      <Footer />
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Menu, MoveRight, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import SignoutButton from './auth/signout-button';
import { LogIn, LogOut } from 'lucide-react';
import { Session } from 'next-auth';

interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: { title: string; href: string }[];
}

const Header = ({ session }: { session: Session | null }) => {
  const navigationItems: NavigationItem[] = [
    {
      title: 'Home',
      href: '/',
      description: '',
    },
    {
      title: 'About Us',
      href: '/about-us',
      description: '',
    },
    {
      title: 'Blog',
      href: '/blog',
      description: '',
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          {navigationItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                pathname === item.href
                  ? 'font-semibold bg-secondary'
                  : 'text-muted-foreground'
              )}
              asChild
            >
              <Link href={item.href || ''}>{item.title}</Link>
            </Button>
          ))}
        </div>
        <div className="flex lg:justify-center">
          <Link href="/">
            <p className="font-semibold text-xl lg:text-2xl font-serif">
              nulisterbuka.
            </p>
          </Link>
        </div>
        <div className="flex justify-end w-full gap-4">
          {session ? (
            <SignoutButton variant="outline">
              <LogOut />
              Sign out
            </SignoutButton>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/signin">
                <LogIn />
                Sign in
              </Link>
            </Button>
          )}
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-6">
              {navigationItems.map((item) => (
                <div key={item.title} className="hover:bg-accent p-2">
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-base md:text-lg">
                          {item.title}
                        </span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

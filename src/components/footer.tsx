'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: { title: string; href: string }[];
}

const Footer = () => {
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

  const socialItems = [
    {
      title: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      title: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      title: 'Facebook',
      href: '#',
      icon: Facebook,
    },
  ];

  return (
    <div className="w-full py-20 bg-foreground text-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-4xl max-w-xl font-serif text-left">
                nulisterbuka.
              </h2>
              <p className="text-lg max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                Platform kasual yang memudahkanmu berbagi dan menemukan cerita.
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                <p>Jalan Kertasari</p>
                <p>Ciamis</p>
                <p>46213</p>
              </div>
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                <Link href="#" className="hover:underline underline-offset-4">
                  Terms of service
                </Link>
                <Link href="#" className="hover:underline underline-offset-4">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              {socialItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex justify-between items-center text-background/75 hover:text-background transition-colors"
                    title={item.title}
                  >
                    <IconComponent className="size-5" />
                  </Link>
                );
              })}
            </div>
            <div className="text-sm text-background/75">
              &copy; {new Date().getFullYear()} nulisterbuka. All rights
              reserved.
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex text-base gap-1 flex-col items-start"
              >
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-base hover:underline underline-offset-4">
                        {item.title}
                      </span>
                    </Link>
                  ) : (
                    <p className="text-xl">{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-background/75">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

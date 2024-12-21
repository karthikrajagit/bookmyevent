'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <ul className="flex gap-6 flex-col md:flex-row">
      <li>
        <Link
          href="/"
          className={`font-semibold ${isActive('/') ? 'text-blue-500' : ''}`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/create-event"
          className={`font-semibold ${isActive('/create-event') ? 'text-blue-500' : ''}`}
        >
          Create Event
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`font-semibold ${isActive('/about') ? 'text-blue-500' : ''}`}
        >
          About
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;

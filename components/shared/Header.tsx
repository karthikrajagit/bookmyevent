import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import MobileNav from './MobileNav'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='w-full border-b-2 bg-'>

      <div className='wrapper flex items-center justify-between'>
        <Link href='/' className=''>
          <Image
            src = '/assets/images/logo.svg'
            alt = "Evently"
            width = {128}
            height = {38}
          />
        </Link>
        <SignedIn>
          <nav className='md:flex-between hidden w-full max-w-xs'>
            <Navbar/>
          </nav>
        </SignedIn>
        <div className='flex justify-end w-32 gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl= "/" />
          </SignedIn>
          <SignedIn>
            
            <MobileNav/>
           
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-lg px-8' size='lg'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header
'use client';
import { Button, Navbar, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { dark, light } from '@clerk/themes';

export default function Header() {
    const path = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <Navbar className='border-b-2'>
            <Link
                href='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='px-2 py-1 bg-gradient-to-r from-pink-400 via-pink-600 to-pink-700 rounded-lg text-white'>
                    LDS Blog
                </span>
            </Link>

            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                {/* Theme Toggle Button */}
                <Button
                    className='w-12 h-10 hidden sm:inline'
                    color='gray'
                    pill
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </Button>

                {/* Clerk Authentication Buttons */}
                <SignedIn>
                    <UserButton
                        appearance={theme === 'dark' ? dark : light} 
                    />
                </SignedIn>

                <SignedOut>
                    <Link href='/sign-in'>
                        <Button gradientMonochrome="pink" outline>
                            Sign In
                        </Button>
                    </Link>
                </SignedOut>

                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <Link href='/'>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        Home
                    </Navbar.Link>
                </Link>
                <Link href='/about'>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                        About
                    </Navbar.Link>
                </Link>
                <Link href='/projects'>
                    <Navbar.Link active={path === '/projects'} as={'div'}>
                        Projects
                    </Navbar.Link>
                </Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

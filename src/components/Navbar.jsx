import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsopen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsopen(!isOpen);
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsopen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className='bg-gray-800 text-white w-full relative'>
            {/* Kiri (Logo SIMRS) */}
            <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                <a href='#' className='text-2xl font-bold'>
                    SIMRS
                </a>
            </div>

            {/* Kanan (Auth Buttons) */}
            <div className='absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:flex gap-4'>
                <button
                    className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'
                    onClick={handleSignIn}
                >
                    Sign In
                </button>
                <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'>
                    Sign Up
                </button>
            </div>

            {/* Tengah (Menu dan Toggle) */}
            <div className='flex justify-center items-center h-16'>
                <div className='hidden md:flex gap-4'>
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Services</a>
                    <a href='#'>Contact</a>
                </div>

                <div className='md:hidden z-30 ml-auto pr-4' onClick={toggleMenu}>
                    {isOpen ? <IoClose size={30} /> : <HiMenu size={30} />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className='bg-gray-800 fixed z-20 top-0 left-0 w-screen min-h-screen flex flex-col items-center justify-center gap-10'>
                    <a className='text-2xl font-bold' href='#'>Home</a>
                    <a className='text-2xl font-bold' href='#'>About</a>
                    <a className='text-2xl font-bold' href='#'>Services</a>
                    <a className='text-2xl font-bold' href='#'>Contact</a>
                    <button
                        className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'>
                        Sign Up
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

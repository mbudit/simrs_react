import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
    const [isOpen, setIsopen] = useState(false)
    const toggleMenu = () => {
        setIsopen(!isOpen)
    }

    useEffect (() => {
        if (isOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    }, [isOpen])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsopen(false)
            } else {}
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []) 


    return (
        <nav className='bg-gray-800 text-white'>
            <div className='max-w-[1200px] mx-auto p-4 flex items-center justify-between'>
                <a href='#' className='text-2xl font-bold z-20'>
                    SIMRS
                </a>
                {!isOpen && (
                    <div onClick={toggleMenu} className='cursor-pointer md:hidden'>
                        <HiMenu size={30}
                        />
                    </div>
                )}
                {isOpen && (
                    <div onClick={toggleMenu} className='cursor-pointer md:hidden z-20'>
                        <IoClose size={30}
                        />
                    </div>
                )}
                {isOpen ? (
                    <div className='bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-0 w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in'>
                        <a className='text-2xl font-bold' href='#'>Home</a>
                        <a className='text-2xl font-bold' href='#'>About</a>
                        <a className='text-2xl font-bold' href='#'>Services</a>
                        <a className='text-2xl font-bold' href='#'>Contact</a>
                        <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'>
                            Sign In
                        </button>
                        <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'>
                            Sign Up
                        </button>
                    </div>
                ) : (
                    <div className='bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-[-150%] w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in'>
                        
                    </div>
                )}
                <div className='items-center gap-4 hidden md:flex'>
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Services</a>
                    <a href='#'>Contact</a>
                </div>
                <div className='items-center gap-4 hidden md:flex'>
                    <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'>
                        Sign In
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md'>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

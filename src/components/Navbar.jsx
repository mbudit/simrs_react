import React, { useEffect, useState, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [isOpen, setIsopen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleMenu = () => setIsopen(!isOpen);
    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserEmail(null);
        navigate("/login");
    };

    const handleSignIn = () => navigate("/login");
    const handleSignUp = () => navigate("/register");

    // Decode token to get email
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserEmail(decoded.email); // assuming your JWT contains { email: "user@example.com" }
            } catch (err) {
                console.error("Invalid token");
                localStorage.removeItem("token");
            }
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) document.body.classList.add("no-scroll");
        else document.body.classList.remove("no-scroll");
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setIsopen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className='bg-gray-800 text-white w-full relative'>
            <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                <a href='#' className='text-2xl font-bold'>SIMRS</a>
            </div>

            <div className='absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:flex gap-4 items-center'>
                {!userEmail ? (
                    <>
                        <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md' onClick={handleSignIn}>Sign In</button>
                        <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md' onClick={handleSignUp}>Sign Up</button>
                    </>
                ) : (
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">
                            {userEmail}
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

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

            {isOpen && (
                <div className='bg-gray-800 fixed z-20 top-0 left-0 w-screen min-h-screen flex flex-col items-center justify-center gap-10'>
                    <a className='text-2xl font-bold' href='#'>Home</a>
                    <a className='text-2xl font-bold' href='#'>About</a>
                    <a className='text-2xl font-bold' href='#'>Services</a>
                    <a className='text-2xl font-bold' href='#'>Contact</a>

                    {!userEmail ? (
                        <>
                            <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md' onClick={handleSignIn}>Sign In</button>
                            <button className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md' onClick={handleSignUp}>Sign Up</button>
                        </>
                    ) : (
                        <button className='bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md' onClick={handleLogout}>Logout</button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

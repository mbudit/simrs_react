import React, { useEffect, useState, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserSettingsModal from "./UserSettingsModal";

const Navbar = ({ setIsAuthenticated }) => {
  const [isOpen, setIsopen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsopen(!isOpen);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("token");
    setUserEmail(null);
    setIsAuthenticated(false); // triggers rerender in App
    navigate("/login");
  };

  const handleSignIn = () => navigate("/login");
  const handleSignUp = () => navigate("/register");

  // Decode token to get email
  useEffect(() => {
    async function fetchAuth() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.authenticated) {
          setUserEmail(data.user.email);
        } else {
          setUserEmail(null);
        }
      } catch (err) {
        setUserEmail(null);
      }
    }
    fetchAuth();
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <nav className="bg-gray-800 text-white w-full relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <a href="#">
          <img
            src="/src/assets/logo.png" // replace with the correct path to your logo
            alt="SIMRS Logo"
            className="h-10 object-contain" // adjust height as needed
          />
        </a>
      </div>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:flex gap-4 items-center">
        {!userEmail ? (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-white"
            >
              <img
                src="src\assets\placeholderavatar.png"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowSettingsModal(true);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  User Settings
                </button>
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

      <div className="flex justify-center items-center h-16">
        <div className="hidden md:flex gap-4">
          <a href="#">Home</a>
          <a href="#">Settings</a>
        </div>

        <div className="md:hidden z-30 ml-auto pr-4" onClick={toggleMenu}>
          {isOpen ? <IoClose size={30} /> : <HiMenu size={30} />}
        </div>
      </div>

      {isOpen && (
        <div className="bg-gray-800 fixed z-20 top-0 left-0 w-screen min-h-screen flex flex-col items-center justify-center gap-10">
          <a className="text-2xl font-bold" href="#">
            Home
          </a>
          <a className="text-2xl font-bold" href="#">
            Settings
          </a>
          {!userEmail ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}
      <UserSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </nav>
  );
};

export default Navbar;

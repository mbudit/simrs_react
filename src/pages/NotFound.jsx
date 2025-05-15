// /pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you're looking for doesn't exist.</p>
      <Link to="/home" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-md">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Sidebar2 from "./components/Sidebar2";
import Home from "./pages/Home";
import DaftarPasien from "./pages/pasien/DaftarPasien";
import RawatJalan from "./pages/rawatjalan/RawatJalan";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";


function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // state auth

  useEffect(() => {
    // Example: check if token exists (adjust based on your backend)
    const token = localStorage.getItem("token");
    setIsAuthenticated(token);
  }, []);

  return (
    <Router>
      <div className="flex flex-col">
        <AppContent
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Router>
  );
}

const AppContent = ({ sidebarCollapsed, setSidebarCollapsed, isAuthenticated }) => {
  const location = useLocation();

  // if user is NOT authenticated and tries to go to any route except /login, redirect them
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar2 collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className="flex-1 min-h-screen bg-blue-200 p-6 overflow-hidden">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/daftarpasien" element={<DaftarPasien />} />
                <Route path="/rawatjalan" element={<RawatJalan />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;

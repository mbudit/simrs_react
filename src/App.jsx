import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Sidebar2 from "./components/Sidebar2";
import Home from "./pages/Home";
import DaftarPasien from "./pages/pasien/DaftarPasien";
import RawatJalan from "./pages/rawatjalan/RawatJalan";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import NotFound from "./pages/NotFound";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/auth/check", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setIsAuthenticated(data.authenticated);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }


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

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar2 collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className="flex-1 min-h-screen bg-blue-200 p-6 overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/daftarpasien" element={<PrivateRoute element={<DaftarPasien />} />} />
                <Route path="/rawatjalan" element={<PrivateRoute element={<RawatJalan />} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;

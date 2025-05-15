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
import Antrian from "./pages/antrian/Antrian";
import RawatInap from "./pages/rawatinap/RawatInap";
import RME from "./pages/rme/RME";
import IGD from "./pages/igd/IGD";
import Radiologi from "./pages/radiologi/Radiologi";
import Laboratorium from "./pages/laboratorium/Laboratorium";
import DataObat from "./pages/farmasi/apotek/DataObat"

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true); // optional loading flag

  

  useEffect(() => {
    // Check auth status from backend cookie/session
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/auth/check", {
          credentials: "include", // important!
        });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (loadingAuth) {
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
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </Router>
  );
}

const AppContent = ({ sidebarCollapsed, setSidebarCollapsed, isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();


  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <div className="flex">
            <Sidebar2 collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className="flex-1 min-h-screen bg-blue-200 p-6 overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/daftarpasien" element={<PrivateRoute element={<DaftarPasien />} />} />
                <Route path="/antrian" element={<PrivateRoute element={<Antrian />} />} />
                <Route path="/rawatjalan" element={<PrivateRoute element={<RawatJalan />} />} />
                <Route path="/rawatinap" element={<PrivateRoute element={<RawatInap />} />} />
                <Route path="/rme" element={<PrivateRoute element={<RME />} />} />
                <Route path="/igd" element={<PrivateRoute element={<IGD />} />} />
                <Route path="/radiologi" element={<PrivateRoute element={<Radiologi />} />} />
                <Route path="/laboratorium" element={<PrivateRoute element={<Laboratorium />} />} />
                <Route path="/dataobat" element={<PrivateRoute element={<DataObat />} />} />
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

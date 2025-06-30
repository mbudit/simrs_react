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
/* import RawatInap from "./pages/rawatinap/RawatInap"; */
import IGD from "./pages/igd/IGD";
import Radiologi from "./pages/radiologi/Radiologi";
import Laboratorium from "./pages/laboratorium/Laboratorium";
import DataObat from "./pages/farmasi/apotek/DataObat"
import { ThemeProvider } from "@mui/material";
import Theme from "./theme";
import RME from "./pages/rme/RME";
import TerimaPasien from "./pages/terima_pasien/TerimaPasien";
import TerimaPasien2 from "./pages/terima_pasien/TerimaPasien2";
import RawatInap from "./pages/rawatinap/RawatInap";
import TarifPelayananRajal from "./pages/data-master/Rajal/TarifPelayananRajal";
import TarifPelayananRanap from "./pages/data-master/Ranap/TarifPelayananRanap";
import TarifPelayananIgd from "./pages/data-master/IGD/TarifPelayananIgd";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // optional loading flag



  useEffect(() => {
    // Check auth status from backend cookie/session
    async function checkAuth() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
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
        <ThemeProvider theme={Theme}>
          <AppContent
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </ThemeProvider>
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
          <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <ThemeProvider theme={Theme}>
                <Navbar setIsAuthenticated={setIsAuthenticated} />
              </ThemeProvider>
            </div>

            {/* SIDEBAR */}
            <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-40">
              <ThemeProvider theme={Theme}>
                <Sidebar2 collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
              </ThemeProvider>
            </div>

            <div className={`pt-16 transition-all duration-300 ml-16 ${sidebarCollapsed ? "ml-16" : "ml-[250px]"
              }`}>
              <main className="h-[calc(100vh-4rem)] overflow-y-auto p-6 bg-blue-200">
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                  <Route path="/data_master/tarif-pelayanan-rajal" element={<PrivateRoute element={<TarifPelayananRajal />} />} />
                  <Route path="/data_master/tarif-pelayanan-ranap" element={<PrivateRoute element={<TarifPelayananRanap />} />} />
                  <Route path="/data_master/tarif-pelayanan-igd" element={<PrivateRoute element={<TarifPelayananIgd />} />} />
                  <Route path="/daftarpasien" element={<PrivateRoute element={<DaftarPasien />} />} />
                  <Route path="/antrian" element={<PrivateRoute element={<Antrian />} />} />
                  <Route path="/rawatjalan" element={<PrivateRoute element={<RawatJalan />} />} />
                  {/* <Route path="/rawatinap" element={<PrivateRoute element={<RawatInap />} />} /> */}
                  {/* <Route path="/terima_pasien" element={<PrivateRoute element={<TerimaPasien />} />} />
                  <Route path="/rawatinap" element={<PrivateRoute element={<RawatInap />} />} /> */}
                  <Route path="/rawatinap/terima_pasien" element={<PrivateRoute element={<TerimaPasien2 />} />} />
                  <Route path="/rawatinap/data_pasien_ranap" element={<PrivateRoute element={<RawatInap />} />} />
                  <Route path="/rme" element={<PrivateRoute element={<RME />} />} />
                  <Route path="/igd" element={<PrivateRoute element={<IGD />} />} />
                  <Route path="/radiologi" element={<PrivateRoute element={<Radiologi />} />} />
                  <Route path="/laboratorium" element={<PrivateRoute element={<Laboratorium />} />} />
                  <Route path="/dataobat" element={<PrivateRoute element={<DataObat />} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;

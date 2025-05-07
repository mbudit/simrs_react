import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RawatJalan from "./pages/rawatjalan/RawatJalan";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Library from "./pages/Library";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Starred from "./pages/Starred";
import Help from "./pages/Help";
import Sidebar2 from "./components/Sidebar2";
import { useState, useEffect } from "react";
import DaftarPasien from "./pages/pasien/DaftarPasien";
import Login from "./pages/login/Login";


function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <Router>
      <div className="flex flex-col">
        <AppContent sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      </div>
    </Router>
  );
}

const AppContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const location = useLocation();  // Mengambil informasi lokasi/rute aktif

  return (
    <>
      {/* Cek apakah halaman login yang aktif */}
      {location.pathname !== "/login" && (
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
                {/* Rute lainnya */}
              </Routes>
            </div>
          </div>
        </>
      )}
      {/* Halaman Login tidak memiliki Navbar dan Sidebar */}
      {location.pathname === "/login" && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App

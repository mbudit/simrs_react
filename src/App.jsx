import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Trigger resize agar DataGrid merespons perubahan
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); // cocokkan dengan animasi sidebar
    return () => clearTimeout(timeout);
  }, [sidebarCollapsed]);

  return (
    <Router>
      <div className='flex flex-col'>
        <Navbar />
        <div className='flex'>
          <Sidebar2 collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <div className='flex-1 min-h-screen bg-blue-200 p-6 overflow-hidden'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/daftarpasien' element={<DaftarPasien />} />
              <Route path='/rawatjalan' element={<RawatJalan />} />
              {/* <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/library" element={<Library />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="/help" element={<Help />} /> */}
              {/* Add more routes matching your menuItems */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App

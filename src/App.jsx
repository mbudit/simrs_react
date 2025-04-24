import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
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
 

function App() {
  return (
    <Router>
      <div className='flex flex-col'>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className='flex-1 min-h-screen bg-blue-200 p-6'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/library" element={<Library />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="/help" element={<Help />} />
              {/* Add more routes matching your menuItems */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App

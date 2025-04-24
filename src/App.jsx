import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


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
              {/* Add more routes matching your menuItems */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App

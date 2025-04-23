import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className='flex flex-col'>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="flex-1 min-h-screen bg-blue-200 flex items-center justify-center">
          <h1 className="text-3xl font-bold">Stay Organized</h1>
        </div>
      </div>

    </div>
  )
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Building2, ClipboardList, UserCog, Home as HomeIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Table from './pages/Table';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <nav className="bg-gray-800/50 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center space-x-2 px-2 py-2 text-white hover:text-blue-400">
                  <Building2 className="h-6 w-6" />
                  <span className="font-semibold text-xl">Auto-Entry</span>
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 rounded-md text-white hover:text-blue-400"
                >
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Home
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 rounded-md text-white hover:text-blue-400"
                >
                  <UserCog className="h-5 w-5 mr-1" />
                  Admin
                </Link>
                <Link
                  to="/table"
                  className="flex items-center px-3 py-2 rounded-md text-white hover:text-blue-400"
                >
                  <ClipboardList className="h-5 w-5 mr-1" />
                  Table
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
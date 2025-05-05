import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/'); 
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-extrabold tracking-wide">
          <span className="text-yellow-300">Event</span>
          <span className="text-white"> Platform</span>
        </h1>

        <div className="space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
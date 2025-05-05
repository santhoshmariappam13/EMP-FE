import React, { useState } from 'react';
import { registerUser } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(email, password, name); 
      console.log('Registration response:', response); 
      if (response) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-green-600 to-teal-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 relative">
        {/* Login Button */}
        <button
          onClick={() => navigate('/login')}
          className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>

        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Register</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg">Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
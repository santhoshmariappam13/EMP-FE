
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';  
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError('Failed to load profile data.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {user ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Hello, {user.email}</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Your Tickets</h3>
            <ul>
              {user.tickets?.map((ticket) => (
                <li key={ticket._id} className="mb-2">
                  <div className="p-4 border rounded-lg">
                    <p>{ticket.event.title} - {ticket.ticketType}</p>
                    <p>Status: {ticket.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { getUserProfile, getUserRegistrations } from '../services/api'; 

function Profile() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getUserProfile(); 
      setUser(profileData);

      const registrationData = await getUserRegistrations(); 
      setRegistrations(registrationData);
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">User Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Your Event Registrations</h2>
          {registrations.length > 0 ? (
            <ul>
              {registrations.map((registration) => (
                <li key={registration.eventId} className="mb-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="font-semibold">{registration.eventTitle}</h3>
                    <p>Status: {registration.status}</p>
                    <p>Ticket Type: {registration.ticketType}</p>
                    <p>Registration Date: {new Date(registration.registrationDate).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not registered for any events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;


import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/api';  

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md p-4">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description.slice(0, 100)}...</p>
            <p className="text-blue-600 mt-2">Date: {new Date(event.date).toLocaleDateString()}</p>
            <a href={`/events/${event._id}`} className="text-blue-500 mt-2 block">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

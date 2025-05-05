import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Upcoming Events</h1>
      
      
      <div className="text-center mb-6">
        <Link to="/register-event">
          <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <span className="text-lg font-semibold">+ Create Event</span>
          </button>
        </Link>
      </div>


      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          // <Link to={`/events/${event._id}`} key={event._id}>
            <EventCard event={event} />
          // </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
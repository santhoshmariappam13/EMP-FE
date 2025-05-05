import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../services/api';
import TicketCard from '../components/TicketCard';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError(true); 
      }
    };
    fetchEvent();
  }, [id]);

  if (error) return <div>Error loading event details. Please try again later.</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg">{event.description}</p>
      <p className="text-gray-500 mt-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-500 mt-2">Price: ${event.ticketPrice}</p>
      {/* Render TicketCard or other components as needed */}
      <TicketCard event={event} />
    </div>
  );
}

export default EventDetail;
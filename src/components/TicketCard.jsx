import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../services/api';

function TicketCard() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(eventId);
        console.log('Event Data:', data); 
        if (data) {
          setEvent(data);
        } else {
          console.error('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-teal-500">
        <div className="text-white text-lg font-semibold">Loading event details...</div>
      </div>
    );
  }

  const handleTicketForm = (ticketId, ticketName) => {
    console.log('Navigating to ticket form with:', { ticketId, ticketName });
    navigate(`/ticket-form/${ticketId}`, { state: { ticketId, ticketName } }); 
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 min-h-screen py-10">
      <div className="container mx-auto p-6 bg-gradient-to-r from-blue-300 rounded-lg shadow-xl">

        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-blue-700 mb-4">
            {event.title}
          </h1>
          <div className="w-24 h-1 mx-auto bg-blue-500 rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">{event.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {event.ticketTypes.map((ticket, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">{ticket.name}</h4>
                <p className="text-gray-600 mb-2">
                  Price: <span className="font-bold text-green-500">${ticket.price}</span>
                </p>
                <p className="text-gray-500 mb-4">Available: {ticket.quantity}</p>
                <button
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300"
                  onClick={() => handleTicketForm(ticket._id, ticket.name)}
                >
                  Buy Now
                </button>
              </div>
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                Popular
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
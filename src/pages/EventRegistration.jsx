import React, { useState } from 'react';
import { createEvent } from '../services/api'; 

function EventRegistration() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    ticketTypes: [{ name: '', price: '', quantity: '' }], 
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...eventData.ticketTypes];
    updatedTickets[index][field] = value;
    setEventData({ ...eventData, ticketTypes: updatedTickets });
  };

  const addTicketType = () => {
    setEventData({
      ...eventData,
      ticketTypes: [...eventData.ticketTypes, { name: '', price: '', quantity: '' }],
    });
  };

  const removeTicketType = (index) => {
    const updatedTickets = eventData.ticketTypes.filter((_, i) => i !== index);
    setEventData({ ...eventData, ticketTypes: updatedTickets });
  };

  const handleCreateEvent = async () => {
    setMessage('');
    setError('');
    try {
      if (!eventData.title || !eventData.description || !eventData.date || !eventData.location) {
        setError('Please fill in all required fields.');
        return;
      }
      const response = await createEvent(eventData); 
      setMessage('Event created successfully!');
      console.log('Event created:', response);
    } catch (error) {
      setError('Failed to create event. Please try again.');
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Event</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event location"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Ticket Types</label>
          {eventData.ticketTypes.map((ticket, index) => (
            <div key={index} className="mb-2 flex gap-4">
              <input
                type="text"
                placeholder="Ticket Name"
                value={ticket.name}
                onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                className="w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                className="w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={ticket.quantity}
                onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                className="w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeTicketType(index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addTicketType}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
          >
            Add Ticket Type
          </button>
        </div>
        <button
          onClick={handleCreateEvent}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default EventRegistration;
import React, { useState } from 'react';
import { buyTicket } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const TicketForm = () => {
  const location = useLocation();
  const { ticketId, ticketName } = location.state || {}; 

  console.log('Ticket ID:', ticketId);
  console.log('Ticket Name:', ticketName);

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate ticket purchase API call
      await buyTicket(ticketId, ticketName, quantity); 

      // Debugging: Log the state being passed
      console.log('Navigating to payment with:', { ticketId, ticketName, quantity });

      // Navigate to Payment page with ticket details
      navigate('/payment', { state: { ticketId, ticketName, quantity } });
    } catch (err) {
      console.error('Error purchasing ticket:', err);
      setError('Failed to buy ticket. Please try again.');
    }
  };

  if (!ticketId || !ticketName) {
    return <div className="text-red-500 text-center mt-10">Invalid ticket data. Please try again.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Purchase Ticket</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="ticketName" className="block text-sm font-semibold text-gray-700">
              Ticket Type
            </label>
            <input
              type="text"
              id="ticketName"
              className="w-full p-3 mt-2 border rounded-lg bg-gray-100 text-gray-700"
              value={ticketName}
              readOnly
            />
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full p-3 mt-2 border rounded-lg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300"
          >
            Purchase Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
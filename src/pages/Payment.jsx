import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load Stripe with your public key
const stripePromise = loadStripe('your-stripe-public-key');

const PaymentForm = ({ ticketId, ticketName, quantity }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/payments/process', {
        ticketId,
        token: paymentMethod.id,
        quantity,
      });

      if (response.data.success) {
        setMessage('Payment successful!');
      } else {
        setMessage('Payment failed.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Secure Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-gray-700">Ticket:</label>
          <p className="text-gray-800 font-medium">{ticketName}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-gray-700">Quantity:</label>
          <p className="text-gray-800 font-medium">{quantity}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-gray-700">Card Details:</label>
          <CardElement className="p-3 border rounded-lg bg-white" />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-300 font-semibold"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-4 rounded-lg shadow-sm text-center bg-red-100 text-red-700">
          {message}
        </div>
      )}
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticketId, ticketName, quantity } = location.state || {};

  useEffect(() => {
    if (!ticketId || !ticketName || !quantity) {
      console.error('Missing ticket data. Redirecting to home.');
      navigate('/');
    }
  }, [ticketId, ticketName, quantity, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <Elements stripe={stripePromise}>
        <div className="payment-container max-w-lg mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <PaymentForm ticketId={ticketId} ticketName={ticketName} quantity={quantity} />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
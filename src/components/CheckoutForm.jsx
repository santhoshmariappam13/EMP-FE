
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function CheckoutForm({ paymentIntent }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
    } else if (confirmedPaymentIntent.status === 'succeeded') {
      alert('Payment Successful!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-center">Payment Information</h2>
      <div className="mb-4">
        <label className="block text-lg">Card details</label>
        <CardElement className="mt-2 p-2 border rounded-md" />
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="flex justify-center">
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${loading && 'opacity-50 cursor-not-allowed'}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;

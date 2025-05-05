import axios from 'axios';

const API_URL = 'https://event-platform-be.onrender.com/api'; 

const getAuthHeaders = async () => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token); 
  if (token && !(await isTokenExpired(token))) {
    return { 'x-auth-token': token };
  } else {
    console.warn('Token is expired or missing');
    return {};
  }
};

const isTokenExpired = (token) => {
  try {
    const payload = token.split('.')[1];

    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    const exp = decodedPayload.exp;

    const currentTime = Math.floor(Date.now() / 1000);

    return exp < currentTime;

  } catch (error) {
    console.error('Error decoding token:', error.message);
    return true; 
  }
};




export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    console.log('Login Response:', response.data); 
    // localStorage.setItem('token', response.data.token); // Store token in localStorage
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response || error);
    if (error.response && error.response.status === 401) {
      console.error('Invalid credentials');
    }
    throw error; 
  }
};


export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.response || error);
    return []; 
  }
};

export const getEventById = async (id) => {
  console.log('Fetching event by ID:', id); 
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error.response || error);
    throw error; 
  }
};

export const buyTicket = async (eventId, ticketType) => {
  console.log('Buying Ticket:', { eventId, ticketType }); 
  try {
    const response = await axios.post(
      `${API_URL}/tickets`,
      { eventId, ticketType },
      { headers: await getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('Error buying ticket:', error.response || error);
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Token expired or invalid');
      alert('Your session has expired. Please log in again.');
    } else if (error.response && error.response.status === 400) {
      console.error('Bad Request: Ticket not available or invalid data');
      alert('Failed to buy ticket. Please check your input and try again.');
    }
    throw error; 
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: await getAuthHeaders(), 
    });
    console.log('User Profile:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response || error);
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Token might have expired');
    }
    throw error;
  }
};

export const registerUser = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response || error);
    throw error; 
  }
};

export const createEvent = async (eventData) => {
  console.log('Event Data:', eventData); 
  try {
    const response = await axios.post(`${API_URL}/events`, eventData, {
      headers: await getAuthHeaders(), 
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error.response || error);
    throw error;
  }
};

export const logoutUser = () => {
  console.log('Logging out user...');
  localStorage.removeItem('token'); 
};
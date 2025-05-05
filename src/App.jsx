import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EventList from './components/EventList';
import TicketForm from './components/TicketForm';
import TicketCard from './components/TicketCard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetail';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventRegistration from './pages/EventRegistration';
import Payment from './pages/Payment';
import { getUserProfile } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Check if user is logged in
  //   const fetchUser = async () => {
  //     try {
  //       const data = await getUserProfile();
  //       setUser(data);
  //     } catch (error) {
  //       setUser(null); // If no user found or error, user is not logged in
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <MainLayout user={user} setUser={setUser} />
    </Router>
  );
}

function MainLayout({ user, setUser }) {
  const location = useLocation();


  const shouldShowNavbar = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <>
      {shouldShowNavbar && <Navbar user={user} />}
      <div>
        <Routes>
          {/* Redirect to Login if user is not logged in */}
          {/* {!user ? (
            <>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          // ) : ( */}
            <>
              {/* Redirect to Home if user is logged in */}
              <Route path="/" element={<Register setUser={setUser} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/register-event" element={<EventRegistration />} />
              <Route path="/ticket-card/:eventId" element={<TicketCard />} />
              <Route path="/ticket-form/:eventId" element={<TicketForm />} />
              <Route path="/ticket/:eventId" element={<TicketForm />} />
              <Route path="/payment" element={<Payment />} /> 
              <Route path="*" element={<Navigate to="/" />} />
            </>
        </Routes>
      </div>
    </>
  );
}

export default App;
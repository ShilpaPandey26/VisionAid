import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import JobOpenings from './components/JobOpenings';
import VolunteerList from './components/VolunteerList'; // Make sure this is correct
import VolunteerDetail from './components/VolunteerDetail';
import Volunteer from './components/Volunteer'; // Make sure this is correct
import FeedbackSystem from './components/FeedbackSystem';
import Login from './components/Login';
import Register from './components/Register';
import Community from './components/Community';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    toast.success("Logout successful!"); // Show toast message on logout
  };

  return (
    <Router>
      <ToastContainer /> {/* Add ToastContainer here for notifications */}
      <div className="h-full flex flex-col">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile handleLogin={handleLogin} />} />
            <Route path="/job-openings" element={<JobOpenings />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/volunteerdetails/:id" element={<VolunteerDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/feedback" element={<FeedbackSystem />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/register" element={<Register handleLogin={handleLogin} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

// Wrapper to extract volunteer data from location state
const VolunteerDetailWrapper = ({ location }) => {
  const { volunteer } = location.state;
  return <VolunteerDetail volunteer={volunteer} />;
};

export default App;

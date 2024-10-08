import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Users,Menu, X, Home, User, Briefcase, Heart, MessageSquare, LogIn, LogOut } from 'lucide-react'; // Importing relevant icons

const Header = ({ isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    speak(isMenuOpen ? 'Menu closed' : 'Menu opened');
  };

  // Function to speak the text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleLinkClick = (text) => {
    speak(text);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <header className="w-full bg-white text-black p-4 shadow-md flex justify-between items-center h-16 fixed z-50 ">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-semibold tracking-wide text-blue-600" onClick={() => speak('Vision Aid')}>
          VisionAid
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="block lg:hidden text-black focus:outline-none"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sliding Sidebar for Mobile View */}
      <div
        className={`fixed inset-y-0 right-0 bg-white text-black w-64 shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        {/* Close Icon */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="focus:outline-none" aria-label="Close menu">
            <X size={28} className="text-black" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col items-start mt-4 p-6 space-y-6">
          <Link
            to="/"
            onClick={() => handleLinkClick('Home')}
            className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
          >
            <Home size={20} /> <span>Home</span>
          </Link>

          {isLoggedIn && ( // Show Profile link only if logged in
            <Link
              to="/profile"
              onClick={() => handleLinkClick('Profile')}
              className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            >
              <User size={20} /> <span>Profile</span>
            </Link>
          )}

          <Link
            to="/job-openings"
            onClick={() => handleLinkClick('Job Openings')}
            className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
          >
            <Briefcase size={20} /> <span>Job Openings</span>
          </Link>

          <Link
            to="/volunteer"
            onClick={() => handleLinkClick('Volunteer')}
            className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
          >
            <Heart size={20} /> <span>Volunteer</span>
          </Link>

          <Link
            to="/community"
            onClick={() => handleLinkClick('Community')}
            className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
          >
          <Users size={20} /><span>Community</span>
        </Link>

          <Link
            to="/feedback"
            onClick={() => handleLinkClick('Feedback')}
            className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
          >
            <MessageSquare size={20} /> <span>Feedback</span>
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => handleLinkClick('Login')}
              className="flex items-center space-x-3 w-full px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            >
              <LogIn size={20} /> <span>Login</span>
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                handleLinkClick('Logout');
              }}
              className="flex items-center space-x-3 w-full text-left px-4 py-2 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            >
              <LogOut size={20} /> <span>Logout</span>
            </button>
          )}
        </nav>
      </div>

      {/* Main Navigation for Desktop (No Icons) */}
      <nav className="hidden lg:flex space-x-8 font-bold">
        <Link
          to="/"
          onClick={() => handleLinkClick('Home')}
          className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        >
          <span>Home</span>
        </Link>
        {isLoggedIn && ( // Show Profile link only if logged in
          <Link
            to="/profile"
            onClick={() => handleLinkClick('Profile')}
            className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
          >
            <span>Profile</span>
          </Link>
        )}
        <Link
          to="/job-openings"
          onClick={() => handleLinkClick('Job Openings')}
          className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        >
          <span>Job Openings</span>
        </Link>
        <Link
          to="/volunteer"
          onClick={() => handleLinkClick('Volunteer')}
          className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        >
          <span>Volunteer</span>
        </Link>

        <Link
          to="/community"
          onClick={() => handleLinkClick('Community')}
          className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        >
          <span>Community</span>
        </Link>

          <Link
          to="/feedback"
          onClick={() => handleLinkClick('Feedback')}
          className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        >
          <span>Feedback</span>
        </Link>
        {!isLoggedIn ? (
          <Link
            to="/login"
            onClick={() => handleLinkClick('Login')}
            className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
          >
            <span>Login</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              handleLogout();
              handleLinkClick('Logout');
            }}
            className="relative after:absolute after:w-0 after:bg-white after:h-0.5 after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
          >
            <span>Logout</span>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

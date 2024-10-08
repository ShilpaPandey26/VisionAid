// Volunteer.js
import React, { useState, useEffect } from 'react';
import VolunteerProfile from './VolunteerProfile'; // Import the new component
import VolunteerList from './VolunteerList'; // Import the new component

function Volunteer() {
  const [isBlindPersonRegistered, setBlindPersonRegistered] = useState(false);
  const [isVolunteerRegistered, setVolunteerRegistered] = useState(false);
  const [showVolunteerProfile, setShowVolunteerProfile] = useState(false); // State to show profile
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // State for selected volunteer
  const [error, setError] = useState(null); // State to track error messages

  // Function to speak the text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Function to stop speech synthesis
  const stopSpeech = () => {
    speechSynthesis.cancel(); // Cancel any ongoing speech
  };

  // useEffect to add keyboard event listener for stopping speech
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        stopSpeech(); // Stop the speech synthesis
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to run once when component mounts

  const registerBlindPerson = () => {
    setBlindPersonRegistered(true);
    speak("You have requested assistance from a volunteer. Please wait while we process your request."); // Feedback
  };

  const registerVolunteer = () => {
    setVolunteerRegistered(true);
    setShowVolunteerProfile(true); // Show profile form after registering
    speak("You have successfully registered as a volunteer. Please complete your profile to begin helping others."); // Feedback
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    
    const requestDescription = e.target[0].value; // Get the request description
    
    if (requestDescription.trim() === '') {
      setError("Request description cannot be empty."); // Set error state
      speak("The description cannot be empty."); // Speak error message
      return;
    }

    setError(null); // Clear any previous errors
    speak("Your request has been submitted successfully. Thank you for reaching out for assistance."); // Feedback after submission
    console.log("Request submitted:", requestDescription); // Simulated submission
  };

  const handleSelectVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
    speak(`You have selected ${volunteer.name} for assistance.`); // Feedback after selecting volunteer
  };

  return (
    <div className="flex flex-col items-center mt-14 p-8 rounded-lg shadow-lg">
      <h2 className="text-blue-700 text-3xl font-bold mb-3 text-center">Volunteer</h2>

      {/* Registration Screen */}
      {!isBlindPersonRegistered && !isVolunteerRegistered && (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={registerBlindPerson}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Request for Volunteer
          </button>
          <button
            onClick={registerVolunteer}
            className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Register as a Volunteer
          </button>
        </div>
      )}

      {/* Show Volunteer Profile Form */}
      {showVolunteerProfile && <VolunteerProfile />} {/* Profile Form */}

      {/* Show Volunteer List if Blind Person is Registered */}
      {isBlindPersonRegistered && !selectedVolunteer && (
        <VolunteerList onSelectVolunteer={handleSelectVolunteer} />
      )}

      {/* Form for Request Submission */}
      {isBlindPersonRegistered && (
        <div className="mt-6 w-full max-w-md">
         
          <form onSubmit={handleRequestSubmit}>
          <button
                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
                type="button" // Changed to type="button" to prevent form submission
                onClick={() => {
                  setBlindPersonRegistered(false);
                  speak("You have returned to the registration screen. Feel free to request assistance or register as a volunteer."); // Feedback
                }} 
              >
                Back
              </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Volunteer;

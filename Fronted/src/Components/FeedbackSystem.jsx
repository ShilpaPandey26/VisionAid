// src/components/FeedbackSystem.jsx
import React, { useState, useEffect } from 'react'; // Import necessary hooks

const FeedbackSystem = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true); // State to manage loading state
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedback'); // Ensure the URL is correct
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
        }
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        setError(`Error fetching jobs: ${error.message}`);
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    
    // Key press event listener to stop speech
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') { // Use the Escape key to stop speech
        stopSpeech();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Run once on mount

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    
    const requestDescription = e.target.feedback.value; // Get the feedback description

    if (requestDescription.trim() === '') {
      setError("Feedback cannot be empty."); // Set error state
      speak("The feedback cannot be empty."); // Speak error message
      return;
    }

    // If there's no error, proceed with submission logic
    setError(null); // Clear any previous errors
    speak("Your feedback has been submitted successfully. Thank you!"); // Feedback after submission
    
    // Add request submission logic here
    console.log("Feedback submitted:", requestDescription); // Simulated submission
  };

  return (
    <section className="p-6 mt-14  h-[36rem] bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
      <form onSubmit={handleFeedbackSubmit} className="mt-4 space-y-4"> {/* Added onSubmit here */}
        <div>
          <label className="block text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            onFocus={() => speak('Please Enter your name.')}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
            required
            onFocus={() => speak('Please Enter your Email.')}
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave your feedback"
            rows="4"
            required
            onFocus={() => speak('Please describe your feedback in detail to help us assist you better.')}
          />
        </div>
        {/* Display error message if there is an error */}
        {error && (
          <div className="text-red-600 text-sm mb-2">
            {/* {error} */}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
};

export default FeedbackSystem;

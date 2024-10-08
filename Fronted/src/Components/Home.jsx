import React, { useEffect } from 'react';

const Home = () => {
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
      // Check if the key pressed is "Escape" (key code 27)
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

  return (
    <div className="flex  mt-14 flex-col lg:flex-row h-auto lg:h-[35.78rem]">
      {/* Left Section */}
      <div
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 bg-gray-100"
        role="complementary"
        aria-label="Join Us to Make a Difference Section"
      >
        <h2
          className="text-3xl lg:text-4xl font-semibold mb-4 text-blue-800 text-center lg:text-left"
          tabIndex={0}
          onFocus={() => speak('Join Us to Make a Difference')}
        >
          Join Us to Make a Difference
        </h2>
        <p
          className="mb-8 text-base lg:text-lg rounded-lg text-gray-700 text-center lg:text-left max-w-md"
          tabIndex={0}
          onFocus={() => speak('Discover various opportunities to connect, learn, and contribute to our community. Whether you are looking for job openings, networking events, or volunteering opportunities, we have something for everyone.')}
        >
          Discover various opportunities to connect, learn, and contribute to our community. Whether you're looking for job openings, networking events, or volunteering opportunities, we have something for everyone.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105 z-10"
          aria-label="Get Started"
          onClick={() => speak('Get Started button clicked')}
        >
          Get Started
        </button>

        {/* Stop Button */}
        {/* <button
          className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-200 transform hover:scale-105 z-10"
          aria-label="Stop Speech"
          onClick={stopSpeech}
        >
          Stop
        </button> */}
      </div>

      {/* Right Section (Image) */}
      <div
        className="w-full lg:w-1/2 h-64 lg:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdn.prod.website-files.com/5a5de2c1a0eb5000019e4dc0/630f1f444edc6b975d313954_website_picture-p-500.png')" }}
        aria-label="Image showing various community opportunities"
        role="img"
        tabIndex={0}
        onFocus={() => speak('Image showing various community opportunities')}
      ></div>
    </div>
  );
};

export default Home;

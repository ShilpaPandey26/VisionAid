import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MapPin, Star } from 'lucide-react'; // Icons from lucide-react

const VolunteerDetail = () => {
    const { state } = useLocation();
    const volunteer = state?.volunteer;

    if (!volunteer) {
        return <p className="text-red-500 mt-4" role="alert">No volunteer data available.</p>;
    }

    const handleRequest = () => {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        // Use Web Speech API to read aloud the request being sent
        const speech = new SpeechSynthesisUtterance();
        speech.text = `Request sent to ${volunteer.name}. Phone: ${volunteer.phone}, Location: ${volunteer.location}, Skills: ${volunteer.skills}, Availability: ${volunteer.availability}.`;
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
    };

    const handleSpeak = () => {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        // Use Web Speech API to read aloud the volunteer details
        const speech = new SpeechSynthesisUtterance();
        speech.text = `Volunteer details: Name: ${volunteer.name}, Phone: ${volunteer.phone}, Location: ${volunteer.location}, Skills: ${volunteer.skills}, Availability: ${volunteer.availability}.`;
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
    };

    const handleStop = () => {
        // Stop the speech synthesis
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleStop();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
        <div
            className="p-6 mt-14 bg-white shadow-md rounded-lg cursor-pointer"
            role="region"
            aria-labelledby="volunteer-details"
            onClick={handleSpeak} // Trigger speech on click
        >
            <h1 id="volunteer-name" className="text-3xl font-bold mb-2" tabIndex="0">{volunteer.name}</h1>

            <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 text-gray-500 mr-2" aria-hidden="true" />
                <p className="text-gray-600" tabIndex="0">{volunteer.phone}</p>
            </div>

            <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" aria-hidden="true" />
                <p className="text-gray-600" tabIndex="0">{volunteer.location}</p>
            </div>

            <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-gray-500 mr-2" aria-hidden="true" />
                <p className="text-gray-600" tabIndex="0">Skills: {volunteer.skills}</p>
            </div>

            <p className="text-gray-600 mb-4">Availability: {volunteer.availability}</p>

           
        </div>
         <button
         className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
         onClick={handleRequest}
         aria-label={`Send request to ${volunteer.name}`}
     >
        
         Send Request
     </button>
     </>
        
    );
};

export default VolunteerDetail;

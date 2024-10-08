import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Updated volunteer data structure to include phone, location, skills, and availability
const volunteersData = [
  { id: 1, name: 'Alice Johnson', phone: '123-456-7890', location: 'New York', skills: 'Tutoring, Skill Development', availability: 'Available' },
  { id: 2, name: 'Bob Smith', phone: '234-567-8901', location: 'Los Angeles', skills: 'Job Application Help', availability: 'Unavailable' },
  { id: 3, name: 'Cathy Brown', phone: '345-678-9012', location: 'Chicago', skills: 'Healthcare Support', availability: 'Available' },
  { id: 4, name: 'David Wilson', phone: '456-789-0123', location: 'Houston', skills: 'Tutoring, Skill Development', availability: 'Available' },
];

const VolunteerList = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Create a summary of available volunteers with availability information
    const volunteerSummary = volunteersData
      .map(volunteer => `${volunteer.name} from ${volunteer.location}, ${volunteer.availability}`)
      .join(', ');
    const summary = `Available volunteers are: ${volunteerSummary}.`;

    // Use Web Speech API to speak the summary
    const speech = new SpeechSynthesisUtterance();
    speech.text = summary;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleVolunteerClick = (volunteer) => {
    // Use Web Speech API to read aloud the volunteer details when clicked
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance();
    speech.text = `You have selected ${volunteer.name}. Phone number: ${volunteer.phone}, Location: ${volunteer.location}, Skills: ${volunteer.skills}, Availability: ${volunteer.availability}.`;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);

    // Navigate to the detail page, passing the volunteer data
    navigate(`/volunteerDetails/${volunteer.id}`, { state: { volunteer } });
  };

  return (
    <div className="mt-14 w-11/12 md:w-3/4 lg:w-2/3 xl:w-2/4 mx-auto">
      <ul className="space-y-6 flex flex-col">
        {volunteersData.map((volunteer) => (
          <li key={volunteer.id} className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <h4 className="font-bold text-lg text-gray-900 mb-2">{volunteer.name}</h4>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Phone:</span> {volunteer.phone}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Location:</span> {volunteer.location}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Skills:</span> {volunteer.skills}</p>
            <p className={`font-semibold text-${volunteer.availability === 'Available' ? 'green' : 'red'}-600 mb-4`}>
              Availability: {volunteer.availability}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              onClick={() => handleVolunteerClick(volunteer)}
            >
              Choose this Volunteer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerList;

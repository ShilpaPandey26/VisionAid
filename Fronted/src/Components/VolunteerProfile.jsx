import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const skillsOptions = ['Job Application Help', 'Tutoring', 'Healthcare Support', 'Skill Development'];
const availabilityOptions = ['Weekdays', 'Weekends', 'Morning', 'Afternoon', 'Evening'];

const VolunteerProfile = () => {
  const navigate = useNavigate();
  const [volunteerProfile, setVolunteerProfile] = useState({
    name: '',
    contact: '',
    skills: [],
    availability: '',
    experience: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteerProfile({ ...volunteerProfile, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions, option => option.value);
    setVolunteerProfile({ ...volunteerProfile, skills: selectedSkills });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Volunteer Profile:', volunteerProfile);
    alert('Profile created successfully!');
    // Resetting the form after submission
    setVolunteerProfile({
      name: '',
      contact: '',
      skills: [],
      availability: '',
      experience: ''
    });
  };

  return (
    <div className="w-11/12 md:w-7/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={volunteerProfile.name}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Contact Information</label>
          <input
            type="text"
            name="contact"
            value={volunteerProfile.contact}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Skills</label>
          <select
            multiple
            name="skills"
            value={volunteerProfile.skills}
            onChange={handleSkillsChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {skillsOptions.map((skill, index) => (
              <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Availability</label>
          <select
            name="availability"
            value={volunteerProfile.availability}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Availability</option>
            {availabilityOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">Experience (Optional)</label>
          <textarea
            name="experience"
            value={volunteerProfile.experience}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe any previous volunteer experience..."
          />
        </div>

        {/* Button Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200"
            type="submit"
          >
            Submit Profile
          </button>

          <button
            className="w-full md:w-auto bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerProfile;

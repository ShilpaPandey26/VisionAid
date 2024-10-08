import React, { useState, useEffect } from 'react';
import ApplicationForm from './ApplicationForm'; // Import the ApplicationForm component

const JobOpenings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job for application
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const jobsPerPage = 5; // Number of jobs to display per page

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs'); // Ensure the URL is correct
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
  }, []);

  const speakJobDetails = (job) => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech synthesis before speaking new details
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Job Title: ${job.title}. Company: ${job.company}. Location: ${job.location}. Employment Type: ${job.employmentType}. Posted: ${job.timeAgoPosted}. Description: ${job.description}.`;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  const summarizeJobs = () => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech synthesis before summarizing
    const summary = jobs.map(job => {
      return `${job.title} at ${job.company} in ${job.location}. ${job.description.substring(0, 50)}...`;
    }).join('. ');
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Here are the available job openings: ${summary}`;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  const handleApply = (job) => {
    setSelectedJob(job); // Set selected job for application
    window.speechSynthesis.cancel(); // Stop any ongoing speech synthesis
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null); // Clear selected job when modal closes
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Stop all speech synthesis
  };

  // Calculate current jobs to display
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-8 mt-14">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Job Openings</h1>
      <button 
        onClick={summarizeJobs} // Button to read job summaries
        className="mb-4 bg-green-600 text-white px-4 py-2 border-none rounded hover:bg-green-700 transition duration-200"
      >
        Summarize Job Openings
      </button>
      <ul className="space-y-6">
        {currentJobs.map((job) => (
          <li 
            key={job.id} 
            className="border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white"
            onClick={() => speakJobDetails(job)} // Speak job details on click
            tabIndex={0} // Make the element focusable for accessibility
            onKeyPress={(e) => {
              if (e.key === 'Enter') speakJobDetails(job); // Allow speaking on Enter key
            }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-700 mt-1"><strong>Company:</strong> {job.company}</p>
            <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-700"><strong>Type:</strong> {job.employmentType}</p>
            <p className="text-gray-500"><strong>Posted:</strong> {job.timeAgoPosted}</p>
            <p className="text-gray-600 mt-2"><strong>Description:</strong> {job.description}</p>
            <div className="mt-4 space-y-2">
              {job.jobProviders.map((provider, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">
                    Apply on {provider.jobProvider}
                  </span>
                  <button 
                    onClick={() => handleApply(job)} // Pass job to handleApply
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)} 
            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <ApplicationForm onClose={closeModal} jobDetails={selectedJob} /> // Render modal
      )}
    </div>
  );
};

export default JobOpenings;

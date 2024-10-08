import React, { useState, useEffect } from 'react';

const ApplicationForm = ({ onClose, jobDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });

  useEffect(() => {
    document.getElementById('name').focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const messages = [
      `Application submitted for ${jobDetails.title}.`,
      'Thank you for your submission.',
      `Your name is ${formData.name}.`,
      `Your email is ${formData.email}.`,
      `Your phone number is ${formData.phone}.`
    ];

    const speakMessages = (messages) => {
      if (messages.length === 0) return;

      const speech = new SpeechSynthesisUtterance(messages[0]);
      speech.lang = 'en-US';

      speech.onend = () => {
        speakMessages(messages.slice(1));
      };

      window.speechSynthesis.speak(speech);
    };

    speakMessages(messages);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      role="dialog"
      aria-labelledby="dialog-title"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 id="dialog-title" className="text-xl font-bold mb-4">
          Apply for {jobDetails.title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 p-2 w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 p-2 w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 p-2 w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-gray-700">
              Resume
            </label>
            <input
              id="resume"
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              aria-required="true"
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;

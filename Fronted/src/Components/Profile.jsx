// src/components/UserProfile.jsx
import { useState } from "react";

const UserProfile = ({ handleLogin }) => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [location, setLocation] = useState("City, Country");
  const [password, setPassword] = useState("password123");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    console.log({ name, username, email, phone, location, password, skills, interests });
  };

  return (
    <section className="p-6 mt-14 bg-gray-50 rounded-lg shadow-md max-w-3xl mx-auto w-3/4  ">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6"> Profile</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name:</label>
          <input
            id="name"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
     
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="location">Location:</label>
          <input
            id="location"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="skills">Skills:</label>
          <input
            id="skills"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter your skills"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="interests">Interests:</label>
          <textarea
            id="interests"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Enter your interests"
            rows="4"
          />
        </div>
        <button
          className="bg-blue-600 text-white p-3 rounded-md w-full hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          Save Profile
        </button>
      </form>
    </section>
  );
};

export default UserProfile;

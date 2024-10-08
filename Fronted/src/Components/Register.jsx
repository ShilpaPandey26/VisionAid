import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Speech Recognition and Speech Synthesis setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Register = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isListening, setIsListening] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const navigate = useNavigate();

  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (isListening) {
      console.warn("Already listening.");
      return;
    }
    recognition.start();
    setIsListening(true);
    // speak("Please start speaking your details.");
  };

  const stopListening = () => {
    if (!isListening) return;

    recognition.stop();
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    
    if (!name) {
      setName(speechResult);
      speak(`You have entered your name as ${speechResult}. Please say your email.`);
      emailInputRef.current.focus();
    } else if (!email) {
      setEmail(speechResult);
      speak(`You have entered your email as ${speechResult}. Please say your password.`);
      passwordInputRef.current.focus();
    } else if (!password) {
      setPassword(speechResult);
      speak(`You have entered your password. Please say your confirm password.`);
      confirmPasswordInputRef.current.focus();
    } else {
      setConfirmPassword(speechResult);
      speak(`You have entered your confirm password. Click register to continue.`);
      handleSubmit();
    }

    stopListening();
  };

  recognition.onerror = (event) => {
    console.error("Error during recognition:", event.error);
    stopListening();
  };

  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      speak("Please enter your name , email, password for registration");
      // stopListening();
      // startListening();
    } catch (error) {
      console.error("Microphone access denied:", error);
      // speak("Microphone access denied. Please allow microphone access to use voice input.");
    }
  };

  useEffect(() => {
    requestMicrophoneAccess();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        stopListening(); // Stop listening when the Escape key is pressed
        // speak("Listening stopped.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      stopListening();
      recognition.abort();
      window.removeEventListener("keydown", handleKeyDown); // Clean up the event listener
    };
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      speak("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      speak("Passwords do not match.");
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
        speak("Registration successful. Redirecting to the home page.");
        handleLogin();
        navigate("/"); // Redirect to home page
      } else {
        toast.error(data.message);
        speak(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
      speak("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-h-screen mt-14 flex justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={nameInputRef}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInputRef}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordInputRef}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={confirmPasswordInputRef}
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white p-3 rounded-md" type="submit">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account? <Link to="/login" onClick={() => speak("Navigating to login page.") }>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

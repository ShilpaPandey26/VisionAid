import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isListening, setIsListening] = useState(false);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const speak = (message) => {
    if (!window.speechSynthesis) {
      console.error("Speech Synthesis not supported in this browser.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(message);
    speech.onend = () => {
      console.log("Speech finished.");
    };

    speech.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };

    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (isListening) {
      console.warn("Already listening.");
      return;
    }
    recognition.stop();
    recognition.start();
    setIsListening(true);
    console.log("Listening started...");
  };

  const stopListening = () => {
    if (!isListening) return;

    recognition.stop();
    setIsListening(false);
    console.log("Listening stopped.");
  };

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    console.log("Speech result:", speechResult);

    if (!email) {
      setEmail(speechResult);
      speak(`You have entered your email as ${speechResult}. Please enter your password next.`);
      passwordInputRef.current.focus(); // Move focus to password input
    } else {
      setPassword(speechResult);
      speak(`You have entered your password as ${speechResult}. Click the login button to proceed.`);
      handleSubmit();
    }

    stopListening();
  };

  recognition.onerror = (event) => {
    console.error("Error during recognition:", event.error);
    stopListening();

    // Handle errors from speech recognition
    if (event.error === "not-allowed") {
      // toast.error("Microphone access denied. Please enable microphone permissions.");
    } else if (event.error === "no-speech") {
      // toast.warn("No speech detected. Please try again.");
    } else {
      // toast.error("An unexpected error occurred: " + event.error);
    }

    setIsListening(false);
  };

  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      speak("Please enter your email and enter your password");
      stopListening();
      startListening();
    } catch (error) {
      console.error("Microphone access denied:", error);
      // toast.error("Microphone access is required for speech recognition.");
    }
  };

  useEffect(() => {
    requestMicrophoneAccess();
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        stopListening(); // Stop listening
        window.speechSynthesis.cancel(); // Stop speech synthesis
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopListening();
      recognition.abort();
      setIsListening(false);
    }; 
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const userData = { email, password };

    // Speak before submitting
    speak("Submitting your login details...");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        speak("Login successful!"); // Speak successful login
        handleLogin();
        navigate("/");
      } else {
        toast.error(data.message);
        speak("Login failed. " + data.message); // Speak error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      speak("An error occurred during login. Please try again."); // Speak general error message
    }
  };

  const handleRegisterClick = () => {
    toast.info("Navigating to the registration page...");
    speak("Navigating to the registration page.");
    navigate("/register"); // Navigate to the registration page
  };

  const handleFocus = () => {
    // Stop speaking when the input is focused
    window.speechSynthesis.cancel();
  };

  return (
    <div className="max-h-screen flex pt-5 mt-20 pl-6 pr-6 pb-32 justify-center bg-gray-100 overflow-y-hidden">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={handleEmailChange}
              onFocus={handleFocus} // Stop speaking when focused
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={password}
              ref={passwordInputRef}
              onChange={handlePasswordChange}
              onFocus={handleFocus} // Stop speaking when focused
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white p-3 rounded-md" type="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" onClick={handleRegisterClick} className="text-blue-800">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

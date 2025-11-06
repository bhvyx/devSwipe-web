import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong.");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-[#0b0f13]">
      <div className="w-[380px] p-8 rounded-2xl bg-[#11161d]/80 backdrop-blur-xl border border-gray-800 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
        <h1 className="text-3xl font-semibold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500">
            {isLoginForm ? "Welcome Back" : "Join DevSwipe"}
          </span>
        </h1>

        <div className="flex flex-col gap-4">
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="mt-3 bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-fuchsia-500 shadow-md transition-all duration-200"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        <p
          className="mt-5 text-center text-gray-400 hover:text-fuchsia-400 cursor-pointer transition-all"
          onClick={() => setIsLoginForm((v) => !v)}
        >
          {isLoginForm
            ? "New user? Create an account"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;

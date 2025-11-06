import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          gender: gender.trim().toLowerCase(),
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-6 py-10 bg-[#0b0f13] min-h-[85vh] relative">
      <div className="w-full md:w-[420px] p-8 rounded-2xl bg-[#11161d]/80 backdrop-blur-xl border border-gray-800 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500">
          Edit Your Profile
        </h2>

        <div className="flex flex-col gap-4">
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
          <input
            type="text"
            placeholder="Age"
            className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gender"
            className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <textarea
            placeholder="About You"
            className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows="3"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profile Photo URL"
            className="bg-gray-900/60 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={saveProfile}
            className="mt-2 bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-fuchsia-500 shadow-md transition-all duration-200"
          >
            Save Profile
          </button>
        </div>
      </div>

      <div className="flex justify-center items-start">
        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>

      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-lg bg-linear-to-r from-green-600 to-emerald-500 text-white shadow-lg text-sm font-medium">
            ✅ Profile saved successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

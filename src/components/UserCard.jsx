import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-80 md:w-96 bg-[#11161d]/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] transition-all duration-300 overflow-hidden">
        <div className="flex justify-center mt-6">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-32 h-32 rounded-full border-2 border-indigo-500 object-cover shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          />
        </div>

        <div className="p-5 flex flex-col items-center text-center text-gray-300">
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500 mb-1">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-sm text-gray-400 mb-2">
              {age} • {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}

          <p className="text-gray-400 text-sm italic mb-4">
            {about || "No bio provided."}
          </p>

          <div className="flex gap-3 w-full justify-center mt-3">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="flex-1 bg-gray-800 text-gray-300 py-2 rounded-lg border border-gray-700 hover:bg-linear-to-r hover:from-red-600 hover:to-rose-600 hover:text-white transition-all duration-200"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="flex-1 bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white py-2 rounded-lg hover:from-indigo-500 hover:to-fuchsia-500 transition-all duration-200"
            >
              Interested
            </button>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-transparent bg-linear-to-br from-indigo-600/20 to-fuchsia-600/20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default UserCard;

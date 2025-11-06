import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const fetched = useRef(false);
  const connections = useSelector((store) => store.connection);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-[#11161d]/70 backdrop-blur-xl px-10 py-8 rounded-2xl border border-gray-800 shadow-[0_0_25px_rgba(79,70,229,0.2)] max-w-lg">
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500 mb-3">
            No Connections Yet
          </h1>
          <p className="text-sm text-gray-400">
            You haven’t made any connections yet. Once you match with someone,
            they’ll appear here 💫
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center px-4 py-10 bg-[#0b0f13] min-h-[85vh]">
      <h1 className="text-3xl font-semibold mb-10 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500">
        Your Connections
      </h1>

      <div className="flex flex-wrap justify-center gap-8 max-w-[1200px]">
        {connections.map(
          ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
            <div
              key={_id}
              className="relative w-72 p-6 rounded-2xl bg-[#11161d]/80 backdrop-blur-xl border border-gray-800 shadow-[0_0_25px_rgba(79,70,229,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-300 flex flex-col items-center text-center"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] mb-3"
              />
              <h2 className="font-semibold text-lg text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500">
                {firstName} {lastName}
              </h2>

              {(age || gender) && (
                <p className="text-sm text-gray-400 mt-1">
                  {age && <span>{age}</span>}
                  {age && gender && <span> • </span>}
                  {gender && (
                    <span>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </span>
                  )}
                </p>
              )}

              {about && (
                <p className="text-gray-400 text-sm mt-3 line-clamp-2 italic">
                  {about}
                </p>
              )}

              <button
                onClick={() => navigate(`/chat/${_id}`)}
                className="mt-5 w-full bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-fuchsia-500 shadow-md transition-all duration-200"
              >
                💬 Chat
              </button>

              <div className="absolute inset-0 rounded-2xl border border-transparent bg-linear-to-br from-indigo-600/15 to-fuchsia-600/15 pointer-events-none"></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Connections;

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
      <h1 className="flex justify-center text-2xl font-bold my-10">
        No Connections found.
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mb-6">Connections</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {connections.map(
          ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
            <div
              key={_id}
              className="border rounded-xl shadow-md p-4 w-64 hover:shadow-lg transition"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h2 className="font-semibold mt-3 text-lg">
                {firstName} {lastName}
              </h2>

              {(age || gender) && (
                <p className="text-sm text-gray-600">
                  {age && <span>{age}</span>}
                  {age && gender && <span> • </span>}
                  {gender && <span>{gender}</span>}
                </p>
              )}

              {about && <p className="text-gray-700 text-sm mt-2">{about}</p>}
              <button
                onClick={() => navigate(`/chat/${_id}`)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                💬 Chat
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Connections;

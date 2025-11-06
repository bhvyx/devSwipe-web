import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect, useRef } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetched = useRef(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-[#11161d]/70 backdrop-blur-xl px-10 py-8 rounded-2xl border border-gray-800 shadow-[0_0_25px_rgba(79,70,229,0.2)] max-w-lg">
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500 mb-3">
            No Pending Requests
          </h1>
          <p className="text-sm text-gray-400">
            You currently don’t have any connection requests. Once someone shows
            interest, their profile will appear here 📩
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center px-4 py-10 bg-[#0b0f13] min-h-[85vh]">
      <h1 className="text-3xl font-semibold mb-10 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500">
        Connection Requests
      </h1>

      <div className="flex flex-wrap justify-center gap-8 max-w-[1200px]">
        {requests.map(({ _id, fromUserId }) => {
          if (!fromUserId) return null;
          const { firstName, lastName, photoUrl, age, gender, about } =
            fromUserId;

          return (
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

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => reviewRequest("rejected", _id)}
                  className="bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequest("accepted", _id)}
                  className="bg-linear-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white py-2 px-5 rounded-lg font-medium shadow-md transition-all"
                >
                  Accept
                </button>
              </div>

              <div className="absolute inset-0 rounded-2xl border border-transparent bg-linear-to-br from-indigo-600/15 to-fuchsia-600/15 pointer-events-none"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

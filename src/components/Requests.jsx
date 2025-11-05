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
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
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
      <h1 className="flex justify-center text-2xl font-bold my-10">
        No pending connection requests found.
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mb-6">Connection Requests</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {requests.map(({ _id, fromUserId }) => {
          if (!fromUserId) return null;
          const { firstName, lastName, photoUrl, age, gender, about } =
            fromUserId;

          return (
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
              <div className="my-2">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", _id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

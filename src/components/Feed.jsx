import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useRef } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const calledOnce = useRef(false);
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-400">
        <div className="bg-[#11161d]/70 backdrop-blur-xl px-10 py-8 rounded-2xl border border-gray-800 shadow-[0_0_25px_rgba(79,70,229,0.2)] max-w-lg">
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500 mb-3">
            No New Matches Available
          </h1>
          <p className="text-sm text-gray-400">
            Looks like you’ve seen everyone for now. Come back later to discover
            new connections 🔄
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[85vh] bg-[#0b0f13]">
      <div className="transition-all duration-300 ease-in-out hover:scale-[1.02]">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;

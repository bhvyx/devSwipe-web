import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useRef } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const calledOnce = useRef(false);

  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
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
      <h1 className="flex justify-center text-2xl font-bold mt-10">
        No new users available to show in the feed.
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const chatContainerRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { sender, text } = msg;
      return {
        firstName: sender?.firstName,
        lastName: sender?.lastName,
        text,
        createdAt: msg.createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, createdAt },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="w-3/4 mx-auto h-[80vh] flex flex-col bg-[#0b0f13] border border-gray-800 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.2)] overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#0f141a] sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-lg">💬</span>
          <h1 className="text-lg font-semibold text-gray-200">Chat</h1>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-[#0b0f13] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No messages yet...
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSender = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`flex items-end ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                {!isSender && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gray-800 text-gray-300 flex items-center justify-center mr-2 text-xs font-medium">
                    {msg.firstName?.[0]}
                  </div>
                )}

                <div
                  className={`flex flex-col ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 max-w-[65%] rounded-2xl text-sm leading-snug shadow-md ${
                      isSender
                        ? "text-white rounded-br-none"
                        : "bg-[#161b22] text-gray-100 rounded-bl-none"
                    }`}
                    style={
                      isSender
                        ? {
                            background:
                              "linear-linear(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%)",
                            boxShadow:
                              "0 2px 10px rgba(99, 102, 241, 0.3), 0 0 15px rgba(139, 92, 246, 0.2)",
                          }
                        : {
                            boxShadow:
                              "0 2px 8px rgba(0,0,0,0.2), 0 0 8px rgba(255,255,255,0.05)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">
                    {`${msg.firstName} ${msg.lastName}`} •{" "}
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {isSender && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center ml-2 text-xs font-medium">
                    {msg.firstName?.[0]}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-gray-800 bg-[#0f141a] flex items-center gap-3 sticky bottom-0">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-[#161b22] text-gray-200 rounded-xl px-4 py-2 text-sm border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-linear-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContex } from "../../context/AuthContext";
import { FaArrowCircleRight } from "react-icons/fa";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="md:min-w-[450px] flex flex-col h-[40rem] sm:h-full min-w-[20rem]">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-[71vh] md:h-full justify-between ">
          <div className="flex items-center justify-between gap-3 bg-slate-500 px-4 py-2 mb-2">
            <div className="flex items-center justify-between sm:justify-normal gap-3 bg-slate-500 px-4 py-2 mb-2">
              <img
                src={selectedConversation.profilePic}
                className="h-10 w-10 rounded-full"
                alt="IMG"
              />
              <span className="text-gray-900 font-bold">
                {selectedConversation.username}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedConversation(null)}
              className="md:hidden"
            >
              <FaArrowCircleRight size={35} />
            </button>
          </div>
          <Messages />
          <MessageInput />
        </div>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContex();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

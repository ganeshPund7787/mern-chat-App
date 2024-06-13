import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../Hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { loading, sendMessage } = useSendMessage();

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form onSubmit={handlSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          name=""
          id=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

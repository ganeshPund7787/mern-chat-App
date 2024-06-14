import React, { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../Hooks/useSendMessage";
import { BsFillImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const imgRef = useRef();

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div className="flex gap-5 cursor-pointer">
      <form onSubmit={handlSubmit} className="w-[85%]">
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
      <div className="flex items-center text-black">
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <BsFillImageFill />
          <input type="file" name="" id="" />
        </button>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg"></h3>
          <div className="flex mt-5">
            <img
              src="https://images.pexels.com/photos/17565977/pexels-photo-17565977/free-photo-of-legs-in-striped-socks-and-sneakers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="flex justify-end mt-5">
            <IoSend size={"20"} />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MessageInput;

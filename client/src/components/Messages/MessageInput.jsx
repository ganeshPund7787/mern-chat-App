import React, { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../Hooks/useSendMessage";
import { BsFillImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import useUploadImg from "../../Hooks/useUploadImg";
import useStoreImg from "../../Hooks/useStoreImg";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const imgRef = useRef(null);
  const { uploadImage, imageUrl, setImageUrl, filePer } = useUploadImg();
  const [file, setFile] = useState(undefined);
  const { storeImgBackend } = useStoreImg();

  console.log("File uploading : ", filePer, "%");

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  const handleImgSend = async () => {
    document.getElementById("my_modal_3").close();
    await storeImgBackend(imageUrl);
    setImageUrl("");
    setFile(null);
  };

  return (
    <>
      <div className="flex gap-3 items-center cursor-pointer">
        <form onSubmit={handlSubmit} className="w-[90%] ml-2">
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
        <div className="flex">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <BsFillImageFill size={20} onClick={() => imgRef.current.click()} />
          </button>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
            ref={imgRef}
            id=""
          />
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box relative">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Image</h3>
            <div className="">
              <img src={file} alt="" />
            </div>
            <div className="modal-action">
              {file ? (
                <button className="btn btn-primary" onClick={handleImgSend}>
                  {filePer !== 100 ? (
                    <div className="loading loading-spinner"></div>
                  ) : (
                    "send"
                  )}
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  close
                </button>
              )}
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default MessageInput;

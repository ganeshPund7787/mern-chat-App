import React from "react";
import SideBar from "../components/sidebar/SideBar";
import MessageContainer from "../components/Messages/MessageContainer";
import useConversation from "../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-[40rem] md:flex-row sm:h-[450px] md:h-[550px] border rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div
        className={`w-full md:w-2/3 ${
          selectedConversation ? "hidden md:block" : "block"
        }`}
      >
        <SideBar />
      </div>

      <div
        className={`w-full md:w-2/3 ${
          selectedConversation ? "block" : "hidden md:block"
        }`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;

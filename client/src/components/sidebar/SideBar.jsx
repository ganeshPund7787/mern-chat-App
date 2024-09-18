import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogOutBtn from "./LogOutBtn";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PiChatsFill } from "react-icons/pi";
import { useAuthContex } from "../../context/AuthContext";

const SideBar = () => {
  const { authUser } = useAuthContex();
  return (
    <div className="border-r  bg-clip-padding  border-slate-500 p-4 flex flex-col h-[40rem] overflow-hidden sm:h-full">
      <SearchInput />
      <hr className="overflow-y-auto my-6 opacity-30" />
      <Conversations />
      <div className="flex items-center justify-between flex-row gap-7 pt-2">
        <LogOutBtn />
        <Link
          title="Your Profile"
          to={"/user-profile"}
          className="flex items-center  mt-2 justify-center cursor-pointer"
        >
          <img
            src={authUser.profilePic}
            alt=""
            className="rounded-full h-8 w-8 border border-cyan-400 "
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

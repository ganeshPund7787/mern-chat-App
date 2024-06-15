import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogOutBtn from "./LogOutBtn";
import { Button } from "@chakra-ui/react";

const SideBar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <hr className="my-6 opacity-30" />
      <Conversations />
      <LogOutBtn />
    </div>
  );
};

export default SideBar;

import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../Hooks/useGetConversation";
import toast from "react-hot-toast";
 
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 character long");
    }
    const conversation = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No search user found");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search.."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-cyan-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;

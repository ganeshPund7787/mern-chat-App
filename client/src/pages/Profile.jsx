import React from "react";
import { FaEdit } from "react-icons/fa";
import { useAuthContex } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import useLogout from "../Hooks/useLogout";

const Profile = () => {
  const { authUser } = useAuthContex();
  const { logout, loading } = useLogout();

  return (
    <div className="flex flex-col md:flex-row sm:h-[450px] md:h-[550px] border rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="font-bold flex mx-10 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Link to={"/"} className="">
          <button className=" text-cyan-500">
            <IoArrowBackCircleSharp size={36} />
          </button>
        </Link>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                src={authUser.profilePic}
                className="mx-auto h-24 w-24 object-cover border rounded-full"
                alt="User Profile"
                title="Profile Pic"
              />
            </div>
            <div>
              <div className="mt-2">
                <input
                  name="fullname"
                  type="text"
                  defaultValue={authUser.fullname}
                  readOnly
                  className="block w-full rounded-md border-0 py-2 px-2 
                 shadow-sm ring-1 ring-inset text-pink-500 uppercase placeholder:text-gray-400 
                 outline-none "
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  name="username"
                  defaultValue={authUser.username}
                  readOnly
                  type="text"
                  className="block w-full rounded-md border-0 py-2 px-2 
                 shadow-md ring-1 ring-inset text-pink-500 placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
          </form>

          <div className={`mt-6 text-red-600 flex justify-between `}>
            <button type="button" disabled={loading} onClick={() => logout()}>
              {loading ? (
                <span className="loading text-cyan-600 loading-spinner"></span>
              ) : (
                "Log out"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

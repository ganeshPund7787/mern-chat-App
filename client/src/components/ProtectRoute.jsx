import React from "react";
import { useAuthContex } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { authUser } = useAuthContex();
  return authUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectRoute;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";
import { Button } from "@chakra-ui/react";

const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-cyan-500">ChitChatZone</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
          <div className="">
            <input
              required
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="">
            <input
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>

          <Link
            to={"/signup"}
            className="text-sm hover:underline font-bold hover:text-cyan-600 mt-2 inline-block"
          >
            Dont Have An Account ?
          </Link>

          <div className="">
            <Button
              disabled={loading}
              type="submit"
              className="btn btn-block btn-sm mt-2"
            >
              {loading ? (
                <span className="text-red-600 loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

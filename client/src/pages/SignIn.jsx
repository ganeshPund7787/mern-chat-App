import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";

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
          Login <span className="text-cyan-500">GupShupHub</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="label p-2">
              <span className="text-base label-text"> Username </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="">
            <label className="label">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>

          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-cyan-600 mt-2 inline-block"
          >
            Dont Have An Account ?
          </Link>

          <div className="">
            <button disabled={loading} className="btn btn-block btn-sm mt-2">
              {loading ? (
                <span className="text-red-600 loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

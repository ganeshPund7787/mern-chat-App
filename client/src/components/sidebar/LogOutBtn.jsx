import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout";

const LogOutBtn = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto ">
      {!loading ? (
        <BiLogOut
          onClick={logout}
          className="w-6 h-6 text-white cursor-pointer"
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogOutBtn;

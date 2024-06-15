import "./index.css";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContex } from "./context/AuthContext.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";

function App() {
  const { authUser } = useAuthContex();
  return (
    <div className="p-4  h-screen flex items-center justify-center">
      <Toaster />
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}

export default App;

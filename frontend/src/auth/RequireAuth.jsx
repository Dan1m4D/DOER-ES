import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    if (!isLoggedIn) {
      navigate("/login?notLoggedIn=true");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};

export default RequireAuth;

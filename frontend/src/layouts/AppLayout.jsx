import { Outlet } from "react-router-dom";
import Navbars from "../components/atoms/Navbar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/auth/authThunks";
const AppLayout = () => {
  const decoded = jwtDecode(localStorage.getItem("access"))  ;
  const dispatch= useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(decoded['user_id']))
  });
  
  return (
    <div className="flex flex-col">
      <Navbars />
      <div className="mt-20 px-10 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

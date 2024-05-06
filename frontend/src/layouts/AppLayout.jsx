import { Outlet } from "react-router-dom";
import Navbars from "../components/atoms/Navbar";

const AppLayout = () => {
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

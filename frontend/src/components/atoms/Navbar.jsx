import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "./Logo";
import {
  dropDownItems,
  librarianNavLinks,
  studentLinks,
  adminNavLinks,
} from "../../assets/navigationLinks";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
function Navbars() {
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);

  const NavLinks =
    role == "librarian"
      ? librarianNavLinks
      : role == "admin"
      ? adminNavLinks
      : studentLinks;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navigateToProfile = () => navigate(`/${role}/profile`);
  return (
    <Navbar fluid rounded className="fixed w-full">
      <Navbar.Brand href="/">
        {/* fix logo component not appearing later !! */}
        <img src="/logo.svg" className="w-12 h-12" alt="Flowbite React Logo" />
        {/* <Logo/> */}
        {/* <Logo/> */}
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="/images/avatar.jpg"
              className="bg-black"
              rounded
            />
          }
        >
          <Dropdown.Header>
            {/* later with redux we will add curring connected user */}
            <span className="block text-sm">{user.first_name} {user.last_name}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={navigateToProfile}>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* add later navbar depending on links */}
        {/* call navlinks of current role */}
        {NavLinks.map((link) => {
          return (
            <NavLink
              to={`${role}/${link.path}`}
              key={link.path}
              className={({ isActive }) => {
                return isActive
                  ? "text-black font-semibold"
                  : "text-gray-600 font-normal";
              }}
            >
              {link.label}
            </NavLink>
          );
        })}

        {}
        {/* <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbars;

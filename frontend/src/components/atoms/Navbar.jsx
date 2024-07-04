import { Dropdown, Navbar } from "flowbite-react";
import {
  librarianNavLinks,
  studentLinks,
  adminNavLinks,
} from "../../assets/navigationLinks";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
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
    navigate("/login");
  };

  const navigateToProfile = () => navigate(`/${role}/profile`);
  return (
    <Navbar fluid rounded className="fixed w-full z-10">
      <Navbar.Brand href="/">
        <img src="/logo.svg" className="w-12 h-12" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          className="z-40"
          inline
          label={<GiHamburgerMenu size={25} />}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {user.first_name} {user.last_name}
            </span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={navigateToProfile}>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
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
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbars;

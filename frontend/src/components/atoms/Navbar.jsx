import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "./Logo";
import { dropDownItems, librarianNavLinks } from "../../assets/navigationLinks";
import { Link, NavLink } from "react-router-dom";

function Navbars() {
  return (
        <Navbar fluid rounded className="fixed w-full">
      <Navbar.Brand href="/">
        {/* fix logo component not appearing later !! */}
        <img
          src="/logo.svg"
          className="w-12 h-12"
          alt="Flowbite React Logo"
        />
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
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            {/* later with redux we will add curring connected user */}
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item> */}
          {dropDownItems.map((link) => {
            return (
              <Dropdown.Item key={link.path}>
                {/* thinking about removing prefix cus we might like to use props */}
                <Link to={`librarian/${link.label}`}>{link.label}</Link>
              </Dropdown.Item>
            );
          })}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* add later navbar depending on links */}
        {librarianNavLinks.map((link) => {
          return (
            <NavLink
              to={`librarian/${link.path}`}
              key={link.path}
              className={({ isActive }) => {
                return isActive ? "text-black font-semibold" : "text-gray-600 font-normal";
              }}
            >
              {link.label}
            </NavLink>
          );
        })}
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

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import logo from "../assets/logo.svg";
import { CgLogOut } from "react-icons/cg";
import { useUserStore } from "../stores/userStore";
import { googleLogout } from "@react-oauth/google";
import "../index.css"
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const username = useUserStore((state) => state.username);
  const email = useUserStore((state) => state.email);
  const profile_picture_url = useUserStore(
    (state) => state.profile_picture_url
  );
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = () => {
    googleLogout();
    logout();
    navigate("/login");
  }
  
  return (
    <Navbar position="sticky" variant="floating">
      <NavbarBrand className="flex items-center" as={Link} href={"/"}>
        <img src={logo} alt="Logo" className="h-[3rem] aspect-auto p-2" />
        <p className="font-bold text-2xl text-[#44AAA9]">DOER</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-2">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={username}
                  size="md"
                  src={profile_picture_url}
                />
                <p className="font-semibold">{username}</p>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="gap-2 h-14">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<CgLogOut />}
                onClick={onLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/login" variant="shadow">
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;

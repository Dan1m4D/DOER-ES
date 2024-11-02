import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
    const navigate = useNavigate();
  return (
    <Navbar position="static">
      <NavbarBrand className="flex items-center">
        <img src={logo} alt="Logo" className="h-[3rem] aspect-auto p-2" />
        <p className="font-bold text-2xl text-[#44AAA9]">DOER</p>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/my" variant="shadow">
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default AppNavbar;
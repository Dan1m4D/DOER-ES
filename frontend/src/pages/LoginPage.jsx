/* eslint-disable no-unused-vars */
import "../index.css";
import { Card, CardBody } from "@nextui-org/react";
import AppNavbar from "../components/Navbar";
import {GoogleLogin} from "@react-oauth/google";
import { useUserStore } from "../stores/userStore";
import { jwtDecode } from "jwt-decode"
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const setSuccess = useUserStore((state) => state.setSuccess);
  const success = useUserStore((state) => state.success);
  
  const [_cookies, setCookie] = useCookies();
  
  const onSuccess = (res) => {
    const access_token = res.credential;
    setCookie("access_token", access_token);
    
    const profile = jwtDecode(access_token);
    login(profile.name, profile.email, profile.picture);
    setSuccess(true);
    navigate("/my");
    
  }

  const onFailure = (response) => {
    setSuccess(false);
    console.log(response);
  }

  return (
    <main>
      <AppNavbar />
      <article className="flex items-center h-screen justify-a round radial-gradient-blue">
        <Card>
          <CardBody className="flex flex-col">
            <h1 className="text-4xl font-bold text-[#44AAA9]">Login</h1>
            <p className="text-[#44AAA9]">
              Please fill in your credentials to login
            </p>
            <br />
          </CardBody>
        </Card>
        <section className="w-1/2 p-10">
          <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
          <p className="text-white">
            To keep connected with us please login with your personal info
          </p>
          
          <GoogleLogin
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </section>
      </article>
    </main>
  );
};

export default LoginPage;

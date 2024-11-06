/* eslint-disable no-unused-vars */
import "../index.css";
import { Card, CardBody } from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { useUserStore } from "../stores/userStore";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { login_image } from "../assets/images";

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
  };

  const onFailure = (response) => {
    setSuccess(false);
    console.log(response);
  };

  return (
    <main
      className="relative w-full h-screen bg-center bg-cover grow"
      style={{
        backgroundImage: "url(" + login_image + ")",
      }}
      aria-label="Photo by Unseen Studio on Unsplash"
    >
      <div className="absolute inset-0 opacity-85 radial-gradient-blue-bg" />

      {success == null ? (
        <article className="flex items-center justify-around h-screen">
          <Card className="w-full md:w-1/3">
            <CardBody className="flex flex-col p-8 text-center">
              <h1 className="text-4xl">
                You{"'"}re one step closer to{" "}
                <span className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-800 via-cyan-950 to-black bg-clip-text">
                  mastering your tasks
                </span>
              </h1>
              <p className="p-2 text-lg text-cyan-800">
                Join a growing community of task achievers!
              </p>
              <span className="p-8">
                <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
              </span>

              <br />
            </CardBody>
          </Card>

          <section className="relative w-1/3 p-10 text-white text-end">
            <h1 className="text-6xl font-semibold">
              Become a{" "}
              <span className="font-serif font-black text-transparent shadow-md bg-gradient-to-b from-cyan-200 to-cyan-600 bg-clip-text text-7xl">
                doer
              </span>
              !
            </h1>
            <p className="text-lg text-white">
              Join us today and start managing your tasks efficiently with the
              support of our community. Whether you're looking to boost your
              productivity, connect with like-minded individuals, or simply stay
              organized, we're here to help you every step of the way.
            </p>
          </section>
        </article>
      ) : success ? ( 
      <>
        Success! Redirecting...
      </>
      ) : (
        <article className="flex items-center justify-around h-screen"></article>
      )}
    </main>
  );
};

export default LoginPage;

import { FaGithub } from "react-icons/fa";
import LogoBig from "../assets/logo_full";

const Footer = () => {
  return (
    <footer className="py-4 text-white bg-gray-800">
      <div className="container flex flex-row items-center justify-around mx-auto">
        <LogoBig />
        <div className="mb-4 text-center">
          <p>© DOER 2024</p>
          <p>Engenharia de Software Classes @ UAveiro</p>
        </div>
        <div>
          <a
            href="https://github.com/Dan1m4D/DOER-ES"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={32} className="hover:text-gray-500"/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

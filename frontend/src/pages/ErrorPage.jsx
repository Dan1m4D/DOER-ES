import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <FaExclamationTriangle className="mb-4 text-6xl text-red-500" />
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <p className="mb-4 text-lg">Page Not Found</p>
      <a
        onClick={() => {
          navigate(-1);
        }}
        className="text-blue-500 hover:underline"
      >
        Go back
      </a>
    </div>
  );
};

export default ErrorPage;

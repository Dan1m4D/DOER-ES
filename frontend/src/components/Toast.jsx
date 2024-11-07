import { FaExclamationTriangle, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
/* import PropTypes from "prop-types";*/
import clsx from "clsx";


/* Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "success", "warning", "info"]).isRequired,
}; */

const Toast = ({ message, type }) => {

  const renderIcon = () => {
    switch (type) {
      case "error":
        return <FaExclamationCircle className="inline-block mr-2" />;
      case "success":
        return <FaCheckCircle className="inline-block mr-2" />;
      case "warning":
        return <FaExclamationTriangle className="inline-block mr-2" />;
      case "info":
        return <FaInfoCircle className="inline-block mr-2" />;
      default:
        return <FaInfoCircle className="inline-block mr-2" />;
    }
  }
  return (
    <div
      className={clsx(
        "absolute right-1 p-4 text-center text-white rounded-md shadow-lg bottom-20",
        {
          "bg-red-500/50": type === "error",
          "bg-green-500/50": type === "success",
          "bg-amber-500/50": type === "warning",
          "bg-cyan-500/50": type === "info",
        }
      )}
    >
      {renderIcon()}
      {message}
    </div>
  );
};

export default Toast;

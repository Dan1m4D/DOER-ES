import {
  FaCheck,
  FaClipboard,
  FaQuestion,
  FaRunning,
} from "react-icons/fa";

export const renderIcon = (status) => {
  switch (status) {
    case "To Do":
      return <FaClipboard className="mx-1" />;
    case "In Progress":
      return <FaRunning className="mx-1" />;
    case "Done":
      return <FaCheck className="mx-1" />;
    default:
      return <FaQuestion className="mx-1" />;
  }
};

export const renderEmoji = (priority) => {
  switch (priority) {
    case "Low":
      return "🏖️";
    case "Medium":
      return "🌇";
    case "High":
      return "⛰️";
    case "Highest":
      return "🌋";
    default:
      return "🏖️";
  }
};

export const renderColor = (task) => {
  if (task?.completed) {
    return task?.updated_at > task?.deadline ? "warning" : "success";
  }
  return "danger";
};

export const renderTime = (task) => {
    if (task?.updated_at) {
      const status = task?.completed ? "Completed" : "Updated";
      return `${status} @ ${formatTimestamp(task?.updated_at)}`;
    }
    return `Created @ ${formatTimestamp(task?.timestamp)}`;
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) return "No date";
    return date.toLocaleString("pt-PT", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

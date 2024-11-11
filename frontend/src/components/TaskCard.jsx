/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import clsx from "clsx";
import { FaCheck, FaClipboard, FaQuestion, FaRunning } from "react-icons/fa";

const TaskCard = ({ task, className }) => {
  const renderIcon = (status) => {
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

  const renderEmoji = (priority) => {
    switch (priority) {
      case "Low":
        return "🏖️";
      case "Medium":
        return "🌆";
      case "High":
        return "⛰️";
      case "Highest":
        return "🌋";
      default:
        return "🏖️";
    }
  };

  return (
    <Card
      key={task?.id}
      className={clsx("col-span-2 border-l-8", className, {
        "border-blue-500": task?.status === "To Do",
        "border-amber-500": task?.status === "In Progress",
        "border-green-500": task?.status === "Done",
        "border-red-500": task?.status === "Cancelled",
      })}
      draggable
    >
      <CardHeader className="flex justify-between text-xl font-semibold">
        {task?.title}
        <Chip
          className={clsx("flex p-2", {
            "bg-blue-500 text-white": task?.status === "To Do",
            "bg-amber-500 text-white": task?.status === "In Progress",
            "bg-green-500 text-white": task?.status === "Done",
          })}
          startContent={renderIcon(task?.status)}
        >
          {task?.status}
        </Chip>
      </CardHeader>
      <CardBody className="gap-1">
        <p className="text-pretty opacity-80 text-cyan-900 line-clamp-2 text-ellipsis ">
          {task?.description}
        </p>
        <p className="text-sm">{renderEmoji(task?.priority)} {task?.priority} </p>
        <p className="text-sm ">
          Created at {formatTimestamp(task?.timestamp)}
        </p>
      </CardBody>
    </Card>
  );
};

export default TaskCard;

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};  

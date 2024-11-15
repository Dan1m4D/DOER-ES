/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
} from "@nextui-org/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import {
  FaCalendar,
  FaCheck,
  FaClipboard,
  FaPen,
  FaQuestion,
  FaRunning,
  FaTrash,
} from "react-icons/fa";
import { deleteTask, updateTask } from "../actions/TaskActions";

const TaskCard = ({ task, className, setShowFeedback, onEdit }) => {
  const queryClient = useQueryClient();

  const onDelete = useMutation({
    queryKey: ["deleteTask"],
    mutationFn: async (id) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setShowFeedback({
        message: "Task deleted successfully",
        type: "success",
      });
    },
    onError: () => {
      setShowFeedback({
        message: "An error occurred while deleting the task",
        type: "error",
      });
    },
  });

  const onCompleteTask = useMutation({
    queryKey: ["completeTask"],
    mutationFn: () => updateTask({ ...task, completed: true }),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setShowFeedback({
        message: "Task completed successfully",
        type: "success",
      });
    },
    onError: () => {
      setShowFeedback({
        message: "An error occurred while completing the task",
        type: "error",
      });
    },
  });

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
        return "🌇";
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
        "border-green-500": task?.status === "Done" || task?.completed,
        "border-red-500": task?.status === "Cancelled",
      })}
    >
      <CardHeader className="flex justify-between text-xl font-semibold line-clamp-1 text-wrap">
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
      <CardBody className="justify-between gap-1">
        <p className="text-pretty opacity-80 text-cyan-900 line-clamp-2 text-ellipsis min-h-max">
          {task?.description}
        </p>
        <Checkbox onChange={() => onCompleteTask.mutate()} >
          Mark as completed
        </Checkbox>

        
        <section className="flex flex-col w-full gap-1">
          <Chip
            color="danger"
            size="lg"
            startContent={<FaCalendar />}
            className="flex gap-2 py-2"
          >
            {formatTimestamp(parseInt(task?.deadline))}
          </Chip>
          <p className="text-sm text-cyan-900/70">
            {task?.updated_at
              ? `${task?.completed ? "Completed" : 'Updated'} @ ${formatTimestamp(task?.updated_at)}`
              : `Created @ ${formatTimestamp(task?.timestamp)}`}
          </p>
        </section>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Chip
          size="large"
          className={clsx("flex py-4 text-lg", {
            "bg-blue-500/90 text-white": task?.priority === "Low",
            "bg-amber-500/90 text-white": task?.priority === "Medium",
            "bg-red-500/90 text-white": task?.priority === "High",
            "bg-purple-500/90 text-white": task?.priority === "Highest",
          })}
        >
          {renderEmoji(task?.priority)} {task?.priority}
        </Chip>
        <ButtonGroup>
          <Button
            size="small"
            startContent={<FaPen />}
            variant="flat"
            className="hover:bg-slate-700/10"
            onClick={() => onEdit(task)}
          />
          <Button
            size="small"
            startContent={<FaTrash />}
            color="danger"
            onClick={() => onDelete.mutate(task?.id)}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;

const formatTimestamp = (timestamp) => {
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

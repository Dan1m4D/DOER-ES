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
import clsx from "clsx";
import { FaCalendar, FaPen, FaTrash } from "react-icons/fa";
import {
  formatTimestamp,
  renderColor,
  renderEmoji,
  renderIcon,
  renderTime,
} from "../utils";

const TaskCard = ({ task, className, onCompleteTask, onEdit, onDelete }) => {
  return (
    <Card
      key={task?.id}
      className={clsx("col-span-2 ", className, {
        "border-blue-500 border-l-8": task?.status === "To Do",
        "border-amber-500 border-l-8": task?.status === "In Progress",
        "border-green-500 border-l-8": task?.status === "Done",
        "border-green-500 border-4 bg-green-100/20": task?.completed,
      })}
    >
      <CardHeader className="flex justify-between text-xl font-semibold line-clamp-1 text-wrap">
        {task?.title}
        <Chip
          className={clsx("flex p-2", {
            "bg-blue-500 text-white": task?.status === "To Do",
            "bg-amber-500 text-white": task?.status === "In Progress",
            "bg-green-500 text-white":
              task?.status === "Done" || task?.completed,
          })}
          startContent={renderIcon(task?.completed ? "Done" : task?.status)}
        >
          {task?.completed ? "Completed" : task?.status}
        </Chip>
      </CardHeader>
      <CardBody className="justify-between gap-1">
        <p className="text-pretty opacity-80 text-cyan-900 line-clamp-2 text-ellipsis min-h-max">
          {task?.description}
        </p>

        <section className="flex flex-col w-full gap-1">
          <Chip
            color={renderColor(task)}
            size="lg"
            startContent={<FaCalendar />}
            className="flex gap-2 py-2"
          >
            {formatTimestamp(parseInt(task?.deadline))}
          </Chip>
          {!task?.completed && (
            <Checkbox onChange={() => onCompleteTask.mutate(task)}>
              Mark as completed
            </Checkbox>
          )}
          <p className="text-sm text-cyan-900/70">{renderTime(task)}</p>
        </section>
      </CardBody>

      <CardFooter className="flex justify-between">
        <Chip
          size="large"
          className={clsx("flex py-4 text-lg", {
            "bg-blue-500/80 text-white": task?.priority === "Low",
            "bg-amber-500/80 text-white": task?.priority === "Medium",
            "bg-red-500/80 text-white": task?.priority === "High",
            "bg-purple-500/80 text-white": task?.priority === "Highest",
          })}
        >
          {renderEmoji(task?.priority)} {task?.priority}
        </Chip>

        <ButtonGroup>
          {!task?.completed && (
            <Button
              size="small"
              startContent={<FaPen />}
              variant="flat"
              isIconOnly
              className="hover:bg-slate-700/10"
              onClick={() => onEdit(task)}
            />
          )}

          <Button
            size="small"
            startContent={<FaTrash />}
            isIconOnly
            color="danger"
            onClick={() => onDelete.mutate(task?.id)}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;

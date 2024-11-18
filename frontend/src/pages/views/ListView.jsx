/* eslint-disable react/prop-types */
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Checkbox,
} from "@nextui-org/react";
import clsx from "clsx";
import {
  renderTime,
  renderEmoji,
  renderIcon,
  formatTimestamp,
} from "../../utils";
import { FaPen, FaTrash } from "react-icons/fa";

const ListView = ({ tasks, onCompleteTask, onEdit, onDelete }) => {
  return (
    <Table
      aria-label="Task List"
      className="h-full col-span-8 gap-2 row-span-9"
      emptyContent={"No rows to display."}
      removeWrapper
    >
      <TableHeader>
        <TableColumn>Task</TableColumn>
        <TableColumn>Priority</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Deadline</TableColumn>
        <TableColumn>Last Updated</TableColumn>
        <TableColumn>Completed</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableRow
            key={task.id}
            className={clsx(task?.completed && "bg-green-400/20", "rounded")}
          >
            <TableCell>{task.title}</TableCell>
            <TableCell>
              <Chip
                size="small"
                className={clsx("flex py-4", {
                  "bg-blue-500/80 text-white": task?.priority === "Low",
                  "bg-amber-500/80 text-white": task?.priority === "Medium",
                  "bg-red-500/80 text-white": task?.priority === "High",
                  "bg-purple-500/80 text-white": task?.priority === "Highest",
                })}
              >
                {renderEmoji(task?.priority)} {task?.priority}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip
                className={clsx("flex p-2 ", {
                  "bg-blue-500 text-white": task?.status === "To Do",
                  "bg-amber-500 text-white": task?.status === "In Progress",
                  "bg-green-500 text-white":
                    task?.status === "Done" || task?.completed,
                })}
                startContent={renderIcon(
                  task?.completed ? "Done" : task?.status
                )}
              >
                {task?.completed ? "Completed" : task?.status}
              </Chip>
            </TableCell>
            <TableCell>{formatTimestamp(task.deadline)}</TableCell>
            <TableCell>{renderTime(task)}</TableCell>
            <TableCell>
              {task?.completed ? (
                <Chip color="success" className="text-white" size="small">
                  Completed
                </Chip>
              ) : (
                <Checkbox
                  onChange={() => onCompleteTask.mutate(task)}
                  checked={task?.completed}
                >
                  Mark as completed
                </Checkbox>
              )}
            </TableCell>
            <TableCell>
              <Button
                variant="flat"
                color="primary"
                className="mx-1"
                isIconOnly
                onClick={() => onEdit(task)}
              >
                <FaPen />
              </Button>
              <Button
                variant="flat"
                color="danger"
                className="mx-1"
                isIconOnly
                onClick={() => onDelete.mutate(task.id)}
              >
                <FaTrash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListView;

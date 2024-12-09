/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTasks,
  getPriorities,
  getStatus,
  deleteTask,
  updateTask,
} from "../actions/TaskActions";
import { useUserStore } from "../stores/userStore";
import { FaPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import AddTaskModal from "../components/AddTaskModal";
import Toast from "../components/Toast";
import { not_found } from "../assets/images";
import { useTaskStore } from "../stores/taskStore";
import CardView from "./views/CardView";
import ListView from "./views/ListView";
import KanbanView from "./views/KanbanView";

const Dashboard = () => {
  const username = useUserStore((state) => state.username);
  const access_token = useUserStore((state) => state.access_token);
  const [showFeedback, setShowFeedback] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // filtering and sorting tasks
  const order_by = useTaskStore((state) => state.order_by);
  const sort_by = useTaskStore((state) => state.sort_by);
  const status_by = useTaskStore((state) => state.status_by);
  const priority_by = useTaskStore((state) => state.priority_by);

  const sorts = useTaskStore((state) => state.sorts);

  const toggleOrder = useTaskStore((state) => state.toggleOrder);
  const setSortBy = useTaskStore((state) => state.setSortBy);
  const setStatusBy = useTaskStore((state) => state.setStatusBy);
  const setPriorityBy = useTaskStore((state) => state.setPriorityBy);

  // views
  const view = useTaskStore((state) => state.view);
  const setView = useTaskStore((state) => state.setView);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // get user tasks
  const {
    data: all_Tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () =>
      getTasks(order_by, sort_by, access_token, status_by, priority_by),
  });

  useEffect(() => {
    refetch();
  }, [order_by, sort_by, status_by, priority_by, refetch]);

  const { data: status } = useQuery({
    queryKey: ["status"],
    queryFn: async () => getStatus(access_token),
  });

  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: async () => getPriorities(access_token),
  });

  const onDelete = useMutation({
    queryKey: ["deleteTask"],
    mutationFn: async (id) => {
      if (
        window.confirm(
          "Are you sure you want to delete this task? This action cannot be undone."
        )
      ) {
        deleteTask(id, access_token);
      } else {
        throw new Error("Task deletion cancelled");
      }
    },
    onSuccess: () => {
      refetch();
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
    mutationFn: (task) =>
      updateTask({ ...task, status: "Done", completed: true }, access_token),
    onSuccess: () => {
      refetch();
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

  const onEdit = (task) => {
    setIsEdit(true);
    setTaskToEdit(task);
    onOpen();
  };

  const onCreate = () => {
    setIsEdit(false);
    setTaskToEdit(null);
    onOpen();
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <p className="flex flex-col col-span-8 auto-rows-min row-span-9 place-content-center place-items-center">
          <Spinner color="primary" /> Loading...
        </p>
      );
    }
    if (all_Tasks?.length == 0) {
      return (
        <section className="flex flex-col col-span-8 auto-rows-min row-span-9 place-content-center place-items-center">
          <h1 className="col-span-2 text-2xl font-semibold text-cyan-900">
            You don&apos;t have any tasks yet 😢
          </h1>
          <img
            src={not_found}
            alt="Not found"
            className="aspect-square w-[30rem]"
          />
        </section>
      );
    }
    switch (view) {
      case "Card":
        return (
          <CardView
            tasks={all_Tasks}
            onCompleteTask={onCompleteTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "List":
        return (
          <ListView
            tasks={all_Tasks}
            onCompleteTask={onCompleteTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "Kanban":
        return (
          <KanbanView
            tasks={all_Tasks}
            onCompleteTask={onCompleteTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      default:
        return (
          <CardView
            tasks={all_Tasks}
            onCompleteTask={onCompleteTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
    }
  };

  return (
    <main className="grid grid-cols-8 gap-4 p-4 mx-[5%] my-4 grow">
      <section className="col-span-7 gap-2 rounded-md place-content-center">
        <h1 className="text-4xl ">
          Welcome,{" "}
          <span className="font-semibold text-cyan-900">{username}</span>
        </h1>
        <h1 className="text-xl font-light">Ready to start doing stuff?</h1>
      </section>
      <Button
        className="col-span-1 row-span-1 text-lg font-semibold place-self-center"
        variant="shadow"
        color="primary"
        onClick={onCreate}
      >
        <FaPlus />
        New task
      </Button>
      <AddTaskModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        setShowFeedback={setShowFeedback}
        task={taskToEdit || null}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      <Select
        className="col-span-1 col-start-1 row-start-2"
        label="View"
        defaultSelectedKeys={[view]}
        onChange={(e) => setView(e.target.value)}
      >
        {["Card", "List", "Kanban"].map((v) => (
          <SelectItem key={v} value={v}>
            {v}
          </SelectItem>
        ))}
      </Select>

      <Select
        className="col-span-1 col-start-5 row-start-2"
        label="Status"
        onChange={(value) => setStatusBy(value.target.value)}
      >
        {status &&
          [...status, "Completed"].map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
      </Select>

      <Select
        className="col-span-1 col-start-6 row-start-2"
        label="Priority"
        onChange={(e) => setPriorityBy(e.target.value)}
      >
        {priorities?.map((p) => (
          <SelectItem key={p} value={p}>
            {p}
          </SelectItem>
        ))}
      </Select>

      <Select
        className="col-span-2 col-start-7 row-start-2"
        label="Sort by"
        defaultSelectedKeys={[sort_by]}
        onChange={(e) => setSortBy(e.target.value)}
        endContent={
          <Button isIconOnly variant="text" onClick={toggleOrder}>
            {order_by === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </Button>
        }
      >
        {sorts?.map((sort) => (
          <SelectItem key={sort}>{sort}</SelectItem>
        ))}
      </Select>

      {renderView()}
      {showFeedback && (
        <Toast message={showFeedback.message} type={showFeedback.type} />
      )}
    </main>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getTasks, getPriorities, getStatus } from "../actions/TaskActions";
import { useUserStore } from "../stores/userStore";
import { FaPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import AddTaskModal from "../components/AddTaskModal";
import Toast from "../components/Toast";
import TaskCard from "../components/TaskCard";
import { not_found } from "../assets/images";
import { useTaskStore } from "../stores/taskStore";

const Dashboard = () => {
  const username = useUserStore((state) => state.username);
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

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // get user tasks
  const {
    data: all_Tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getTasks(order_by, sort_by, status_by, priority_by),
  });

  useEffect(() => {
    console.log("=====================================");
    console.log("order_by", order_by);
    console.log("sort_by", sort_by);
    console.log("status_by", status_by);
    console.log("priority_by", priority_by);
    console.log("=====================================");
    refetch();
  }, [order_by, sort_by, status_by, priority_by, refetch]);

  const { data: status } = useQuery({
    queryKey: ["status"],
    queryFn: async () => getStatus(),
  });

  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: async () => getPriorities(),
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
        className="col-span-1 col-start-5 row-start-2"
        label="Status"
        onChange={(value) => setStatusBy(value.target.value)}
      >
        {status && [...status, "Completed"].map((s) => (
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

      {isLoading ? (
        <p className="flex flex-col col-span-8 auto-rows-min row-span-9 place-content-center place-items-center">
          <Spinner color="primary" /> Loading...
        </p>
      ) : all_Tasks?.length == 0 ? (
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
      ) : (
        <section className="grid grid-cols-8 col-span-8 gap-3 grid-rows-subgrid row-span-9 ">
          {all_Tasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              className="row-span-1"
              setShowFeedback={setShowFeedback}
              onEdit={onEdit}
            />
          ))}
        </section>
      )}
      {showFeedback && (
        <Toast message={showFeedback.message} type={showFeedback.type} />
      )}
    </main>
  );
};

export default Dashboard;

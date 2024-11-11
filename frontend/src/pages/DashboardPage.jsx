import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../actions/TaskActions";
import { useUserStore } from "../stores/userStore";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "../components/AddTaskModal";
import Toast from "../components/Toast";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const username = useUserStore((state) => state.username);
  const [showFeedback, setShowFeedback] = useState(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // get user tasks
  const { data: all_Tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getTasks(),
  });

  return (
    <main className="grid grid-cols-8 gap-4 grid-rows-9 p-4 mx-[5%] my-4 grow">
      <section className="col-span-7 row-span-1 p-2 rounded-md">
        <h1 className="text-4xl ">
          Welcome,{" "}
          <span className="font-semibold text-cyan-900">{username}</span>
        </h1>
        <h1 className="text-xl font-light">Ready to start doing stuff?</h1>
      </section>
      <Button
        className="col-span-1 row-span-1 text-lg font-semibold"
        variant="shadow"
        color="primary"
        onClick={onOpen}
      >
        <FaPlus />
        New task
      </Button>
      <AddTaskModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        setShowFeedback={setShowFeedback}
      />

      {all_Tasks?.length == 0 ? (
        <section className="col-span-8 border rounded-md bg-gray-100/30">
          <h1 className="text-2xl text-center">No tasks yet</h1>
        </section>
      ) : (
        <section className="grid grid-cols-8 col-span-8 row-span-1 gap-2 r">

        {all_Tasks?.map((task) => <TaskCard key={task._id} task={task} className="row-span-1" />)}
        </section>

      )}
      {/* <article className="grid-cols-8 col-span-8 gap-2">
        <section className="col-span-2 rounded bg-blue-500/20">
          {all_Tasks?.filter((task) => task.status === "To Do").map(task => (
            <TaskCard key={task.id} task={task} className="row-span-1" />
          ))} 
          
        </section>
        <section className="col-span-2 rounded bg-amber-500/20">
          {all_Tasks?.filter((task) => task.status === "In Progress").map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
        <section className="col-span-2 rounded bg-green-500/20">
          {all_Tasks?.filter((task) => task.status === "Done").map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
        <section className="col-span-2 rounded bg-gray-500/20">
          {all_Tasks?.filter((task) => {
            return task.status !== "To Do" && task.status !== "In Progress" && task.status !== "Done";
          }).map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      </article> */}
      {showFeedback && (
        <Toast message={showFeedback.message} type={showFeedback.type} />
      )}
    </main>
  );
};

export default Dashboard;

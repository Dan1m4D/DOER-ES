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
    <main className="grid grid-cols-8 gap-4 p-4 mx-[5%] my-4 grid-rows-8 grow">
      <section className="col-span-7 row-span-1 row-start-1 p-2 rounded-md">
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
        <section className="col-span-8 border rounded-md row-span-7 bg-gray-100/30">
          <h1 className="text-2xl text-center">No tasks yet</h1>
        </section>
      ) : (
        all_Tasks?.map((task) => <TaskCard key={task._id} task={task} />)
      )}
      {showFeedback && (
        <Toast message={showFeedback.message} type={showFeedback.type} />
      )}
    </main>
  );
};

export default Dashboard;

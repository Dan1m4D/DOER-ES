import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../actions/TaskActions";
import { useUserStore } from "../stores/userStore";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "../components/AddTaskModal";
import Toast from "../components/Toast";
import TaskCard from "../components/TaskCard";
import { not_found } from "../assets/images";

const Dashboard = () => {
  const username = useUserStore((state) => state.username);
  const [showFeedback, setShowFeedback] = useState(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // get user tasks
  const { data: all_Tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getTasks(),
  });

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
        <section className="flex flex-col col-span-8 row-start-2 auto-rows-min row-span-9 place-content-center place-items-center">
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
        <section className="grid col-span-8 gap-3 grid-cols-subgrid grid-rows-subgrid row-span-9 ">
          {all_Tasks?.map((task) => (
            <TaskCard key={task._id} task={task} className="row-span-1"  setShowFeedback={setShowFeedback} />
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

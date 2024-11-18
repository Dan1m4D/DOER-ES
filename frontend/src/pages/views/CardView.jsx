/* eslint-disable react/prop-types */
import TaskCard from "../../components/TaskCard";

const CardView = ({ tasks, onCompleteTask, onEdit, onDelete }) => {
  return (
    <section className="grid grid-cols-8 col-span-8 gap-3 grid-rows-subgrid row-span-9 ">
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          className="row-span-1"
          onEdit={onEdit}
          onDelete={onDelete}
          onCompleteTask={onCompleteTask}
        />
      ))}
    </section>
  );
};

export default CardView;

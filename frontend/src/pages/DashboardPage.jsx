import { useEffect, useState } from "react";
import { Card, Button, Input } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../actions/TaskActions";

const Dashboard = () => {
  
  const {data: all_Tasks, isLoading}  = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getTasks(),
  });
  
  useEffect(() => {
    if (all_Tasks) {
      console.log("all_tasks: ",all_Tasks);
    }
  }, [all_Tasks]);
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to handle adding a task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask }]);
      setNewTask(""); // Reset input after adding
    }
  };

  console.log(tasks);

  // Function to handle deleting a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <main className="max-w-3xl px-4 py-10 mx-auto grow">
      {/* Dashboard Title */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold">Task Dashboard</h2>
      </div>

      {/* Task Add Form */}
      <div className="flex flex-col items-center mb-6">
        <Input
          clearable
          placeholder="Add a new task"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mb-4"
        />
        <Button auto onClick={addTask} color="gradient" className="w-full">
          Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="flex flex-col items-center">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card
              key={task.id}
              className="flex items-center justify-between w-full p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold">{task.name}</p>
              <Button auto color="error" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </Card>
          ))
        ) : (
          <p className="mt-10 text-center text-gray-500">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

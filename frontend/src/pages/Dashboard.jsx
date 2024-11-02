// src/components/Dashboard.js

import { useState } from "react";
import { Card, Button, Input } from "@nextui-org/react";

const Dashboard = () => {
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
    <div className="max-w-3xl px-4 py-10 mx-auto">
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
    </div>
  );
};

export default Dashboard;

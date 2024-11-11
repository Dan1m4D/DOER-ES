import axios from "./axios.jsx";

// get all tasks
export const getTasks = async () => {
  try {
    const res = await axios.get("/task").then((res) => res.data);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// create a new task
export const createTask = async (data) => {
  try {
    await axios.post("/task", data)
  } catch (error) {
    console.error(error);
  }
};


// get all statuses
export const getStatus = async () => {
  try {
    const res = await axios.get("/task/status").then((res) => res.data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// get all priorities
export const getPriorities = async () => {
  try {
    const res = await axios.get("/task/priority").then((res) => res.data);
    return res;
  } catch (error) {
    console.error(error);
  }
};
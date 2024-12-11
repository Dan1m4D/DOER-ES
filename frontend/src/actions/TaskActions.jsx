import axios from "./axios.jsx";

// get all tasks
export const getTasks = async (
  order_by,
  sort_by,
  access_token,
  status_by = null,
  priority_by = null,
) => {
  try {
    const res = await axios
      .get(
        `/task?order_by=${order_by}&sort_by=${sort_by}&status_by=${status_by}&priority_by=${priority_by}`,
        {
          headers: {
            Credential: access_token,
          },
        }
      )
      .then((res) => res.data);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// create a new task
export const createTask = async (data, access_token) => {
  try {
    console.log(data);
    await axios.post(
      "/task",
      data,
      {
        headers: {
          Credential: access_token,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// update a task
export const updateTask = async (data, access_token) => {
  try {
    await axios.put(
      `/task/${data.id}`,
      data,
      {
        headers: {
          Credential: access_token,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

// get all statuses
export const getStatus = async (access_token) => {
  try {
    const res = await axios
      .get("/task/status", {
        headers: {
          Credential: access_token,
        },
      })
      .then((res) => res.data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// get all priorities
export const getPriorities = async (access_token) => {
  try {
    const res = await axios
      .get("/task/priority", {
        headers: {
          Credential: access_token,
        },
      })
      .then((res) => res.data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// delete a task
export const deleteTask = async (id, access_token) => {
  try {
    await axios.delete(`/task/${id}`, {
      headers: {
        Credential: access_token,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

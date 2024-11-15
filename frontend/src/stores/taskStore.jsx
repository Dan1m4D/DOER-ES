import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTaskStore = createStore(persist((set) => ({
    status: [],
    tasks: [],
    currentTask: null,

    setStatus: (status) => set((state) => ({ ...state, status })),
    setTasks: (tasks) => set((state) => ({ ...state, tasks })),
    setCurrentTask: (currentTask) => set((state) => ({ ...state, currentTask })),
}), {
    name: "task-storage",
    storage: createJSONStorage(() => sessionStorage),
  }));
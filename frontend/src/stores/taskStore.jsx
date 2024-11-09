import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTaskStore = createStore(persist((set) => ({
    status: [],
    tasks: [],

    setStatus: (status) => set((state) => ({ ...state, status })),
    setTasks: (tasks) => set((state) => ({ ...state, tasks })),
}), {
    name: "task-storage",
    storage: createJSONStorage(() => sessionStorage),
  }));
import { create } from "zustand";

export const useTaskStore = create((set) => ({
  sorts: ["Creation", "Priority", "Deadline", "Name", "Status"],

  sort_by: "Creation",
  order_by: "asc",
  status_by: "",
  priority_by: "",
  view: "Card",

  toggleOrder: () =>
    set((state) => ({
      ...state,
      order_by: state.order_by === "asc" ? "desc" : "asc",
    })),
  setSortBy: (sort_by) => set((state) => ({ ...state, sort_by })),
  setStatusBy: (status_by) => set((state) => ({ ...state, status_by })),
  setPriorityBy: (priority_by) => set((state) => ({ ...state, priority_by })),
  setView: (view) => set((state) => ({ ...state, view })),

  reset: () =>
    set((state) => ({
      ...state,
      sort_by: "Creation",
      order_by: "asc",
      status_by: "",
      priority_by: "",
    })),
}));

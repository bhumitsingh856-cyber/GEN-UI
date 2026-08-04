import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCodeStore = create(
  persist((set) => ({
    files: {},
    allProjects: [],
    currentProjectID: null,
    setFiles: (files) => set({ files }),
    setCurrentProjectID: (id) => set({ currentProjectID: id }),
    updateCode: (path, code) =>
      set((state) => ({
        files: {
          ...state.files,
          [path]: code,
        },
      })),
    setAllProjects: (projects) => set({ allProjects: projects }),
    addProject: (project) =>
      set((state) => ({ allProjects: [...state.allProjects, project] })),
  })),
);

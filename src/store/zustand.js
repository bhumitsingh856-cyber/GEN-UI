import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCodeStore = create(
  persist((set) => ({
    files: {},
    setFiles: (files) => set({ files }),
    updateCode: (path, code) =>
      set((state) => ({
        files: {
          ...state.files,
          [path]: code,
        },
      })),
  })),
);

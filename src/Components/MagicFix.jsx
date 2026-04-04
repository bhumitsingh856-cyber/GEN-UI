import { useCodeStore } from "@/store/zustand";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const AIFixButton = () => {
    const { files, updateCode } = useCodeStore();
 
  const { sandpack } = useSandpack();
  const { error, updateFile } = sandpack;
  const [fixing, setFixing] = useState(false);

  const handleFix = async () => {
    if (!error) {
      toast.success("No errors detected! Your code is looking good.", {
        duration: 3000,
      });
      return;
    }

    setFixing(true);

    try {
      const pathMatch = error?.message?.match(/(\/[\w./-]+\.\w+)/);
      const filePath = pathMatch ? pathMatch[1] : null;
      const code = files[filePath];

      const payload = {
        errorFullObject: error,
        component: {
          file: filePath,
          code: code.code,
        },
      };

      const res = await axios.post("/api/fixai", payload);
      if (res.data.success) {
        updateFile(filePath, res.data.code);
        updateCode(filePath, { code: res.data.code });
      }
    } catch (e) {
      console.error("Fix failed:", e);
    } finally {
      setFixing(false);
    }
  };

  return (
    <button
      onClick={handleFix}
      disabled={fixing}
      className="md:px-4 px-2  bg-linear-to-r from-blue-800 hover:scale-105 border-2 border-white/50 to-green-600 hover:from-sky-800 hover:to-yellow-600  duration-300 font-bold rounded-full text-white shadow-lg flex items-center gap-2"
    >
      {fixing ? (
        <>
          <div className="w-3.5 h-3.5 rounded-full border-8 border-white/20 border-t-white animate-spin" />
          Fixing...
        </>
      ) : (
        "Magic Fix ✨"
      )}
    </button>
  );
};

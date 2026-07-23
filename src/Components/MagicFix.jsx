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
      toast.success("No error detected !", {
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
      toast.error("Fix failed, Try again", {
        duration: 3000,
      });
    } finally {
      setFixing(false);
    }
  };

  return (
    <button
      onClick={handleFix}
      disabled={fixing}
      className="px-3 py-1 text-xs rounded-full 
    bg-amber-500/20 text-amber-400 
    hover:bg-amber-500/30 
    border border-amber-500/30 hover:border-amber-500/50
    transition-all duration-200
    disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {fixing ? (
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin inline-block" />
          Fixing...
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <span className="text-sm">✨</span>
          Magic Fix
        </span>
      )}
    </button>
  );
};

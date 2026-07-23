import { useSandpack } from "@codesandbox/sandpack-react";
import { useCodeStore } from "@/store/zustand";
import toast from "react-hot-toast";

export default function SyncButton() {
  const { sandpack } = useSandpack(); // ✅ Hook at top level
  const { setFiles } = useCodeStore();

  const handleSync = () => {
    setFiles(sandpack.files);
    toast.success("Saved Changes");
  };

  return (
    <button
      onClick={handleSync}
      className="px-3 py-1 text-xs bg-white/10 rounded hover:bg-white/20"
    >
      Save Changes
    </button>
  );
}

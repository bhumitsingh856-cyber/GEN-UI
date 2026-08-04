import { useSandpack } from "@codesandbox/sandpack-react";
import { useCodeStore } from "@/store/zustand";
import { updateProjectCode } from "@/actions/updateProjectCode";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader } from "lucide-react";
export default function SyncButton() {
  const { sandpack } = useSandpack();
  const { setFiles, currentProjectID } = useCodeStore();
  const { user } = useUser();
  const [saving, setSaving] = useState(false);

  const handleSync = async () => {
    const files = sandpack.files;
    setSaving(true);
    setFiles(files);

    if (user && currentProjectID) {
      const res = await updateProjectCode(currentProjectID, files);
      setSaving(false);
      if (res?.success) {
        toast.success(res?.message);
        return;
      }else{
        toast.error(res?.message);
      }
    }

    setSaving(false);
    toast.success("Saved locally");
  };

  return (
    <button
      onClick={handleSync}
      disabled={saving}
      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition disabled:opacity-40"
    >
      {saving ? (
        <span className="flex items-center gap-1">
          <Loader className="animate-spin h-4 w-4" />
          Saving...
        </span>
      ) : (
        <span>Save Changes</span>
      )}
    </button>
  );
}

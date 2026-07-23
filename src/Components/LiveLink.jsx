import { useCodeStore } from "@/store/zustand";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
function LiveLink() {
  const { files } = useCodeStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLiveLink = async () => {
    setLoading(true);
    let formatedFile = {};
    Object.entries(files).forEach(([path, file]) => {
      const cleanPath = path.replace(/^\//, "");
      formatedFile[cleanPath] = { content: file.code };
    });
    try {
      const { data } = await axios.post(
        "https://codesandbox.io/api/v1/sandboxes/define?json=1",
        { files: formatedFile },
      );
      const url = `https://${data.sandbox_id}.csb.app`;
      router.push(url);
    } catch (e) {
      toast.error("Failed to create live link");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleLiveLink}
      disabled={loading}
      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition disabled:opacity-40"
    >
      {loading ? (
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
          Loading...
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <Link className="w-3 h-3" />
          Live Link
        </span>
      )}
    </button>
  );
}

export default LiveLink;

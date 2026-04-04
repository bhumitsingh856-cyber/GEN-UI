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
      router.push(`https://${data.sandbox_id}.csb.app`);
    } catch (e) {
      toast.error("Failed to create live link");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleLiveLink}
      className="md:px-4 px-2 py-1 gap-1  items-center flex text-3xs md:text-xs bg-linear-to-r border-2 hover:scale-105 duration-300 border-white/20 from-stone-600 to-zinc-800 font-bold rounded-full text-white "
    >
      <Link className="scale-75" />
      Live Link
      {loading && <div className="w-3.5 h-3.5 rounded-full border-8 border-white/20 border-t-white animate-spin" />}
    </button>
  );
}

export default LiveLink;

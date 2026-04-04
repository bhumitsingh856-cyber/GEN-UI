import JSZip from "jszip";
import { saveAs } from "file-saver";
import { CloudDownload } from "lucide-react";
import { useSandpack } from "@codesandbox/sandpack-react";
import toast from "react-hot-toast";
function Export() {
  const { sandpack } = useSandpack();
  const handleExport = async () => {
    try {
      const zip = new JSZip();
      Object.entries(sandpack.files).forEach(([path, file]) => {
        const zipPath = path.replace(/^\//, "");

        zip.file(zipPath, file.code);
      });
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "GENUI.zip");
      toast.success("Code exported successfully");
    } catch (e) {
      toast.error("Failed to export code");
    }
  };

  return (
    <button
      onClick={() => handleExport()}
      className="md:px-4 py-1 px-2  bg-linear-to-r from-stone-600 hover:scale-105 border-2 border-white/50 to-zinc-800 hover:from-stone-800 hover:to-zinc-600  duration-300 font-bold rounded-full text-white shadow-lg flex items-center gap-1"
    >
      <CloudDownload className="scale-75" />
      Export
    </button>
  );
}

export default Export;

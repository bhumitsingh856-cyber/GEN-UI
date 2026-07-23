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
      onClick={handleExport}
      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition"
    >
      <span className="flex items-center gap-1">
        <CloudDownload className="w-3 h-3" />
        Export
      </span>
    </button>
  );
}

export default Export;

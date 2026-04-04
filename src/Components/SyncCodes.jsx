import { useSandpack } from "@codesandbox/sandpack-react";
import { useCodeStore } from "@/store/zustand";
import { useEffect, useRef } from "react";
function SyncCodes() {
  const { sandpack } = useSandpack();
  const { setFiles } = useCodeStore();
  const ref = useRef(sandpack.files);
  console.log(sandpack.files);
  useEffect(() => {
    if (ref.current !== sandpack.files) {
      ref.current = sandpack.files;
      setFiles(sandpack.files);
    }
  }, [sandpack.files]);

  return null;
}

export default SyncCodes;

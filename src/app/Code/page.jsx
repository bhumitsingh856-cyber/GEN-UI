"use client";
import { useCodeStore } from "@/store/zustand";
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";

const Page = () => {
  const { files } = useCodeStore();
  return (
    <SandpackProvider theme="dark" template="react" files={files}>
      <SandpackPreview
        className="h-screen"
        showRefreshButton={true}
        showOpenInCodeSandbox={true}
        showNavigator={true}
      />
    </SandpackProvider>
  );
};

export default Page;

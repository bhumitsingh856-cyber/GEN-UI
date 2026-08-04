"use client";
import React, { useState } from "react";
import { useCodeStore } from "@/store/zustand";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import CustomFileExplorer from "@/Components/Explorer";
import Navbar from "@/Components/Navbar";
import ChatPanel from "@/Components/ChatPanel";
import { AnimatePresence } from "framer-motion";

function Page() {
  const { files } = useCodeStore();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // The editor reads the active project files from Zustand.
  // Project selection and generation both populate the store.
  return (
    <div className="relative">
      <SandpackProvider theme="dark" template="react" files={files}>
        <div className="sticky top-0 z-90">
        <Navbar onChatToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
        <SandpackLayout>
          <CustomFileExplorer />
          <SandpackCodeEditor
            style={{ height: "100vh" }}
            showInlineErrors={true}
            showLineNumbers={true}
            showRunButton={true}
          />
          <SandpackPreview
            style={{ height: "100vh" }}
            showRefreshButton={true}
            showNavigator={true}
          />
        </SandpackLayout>
        <SandpackConsole />
        <AnimatePresence>
          {isChatOpen && (
            <ChatPanel
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          )}
        </AnimatePresence>
      </SandpackProvider>
    </div>
  );
}

export default Page;

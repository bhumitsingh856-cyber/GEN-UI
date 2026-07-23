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
  return (
    <div>
      <SandpackProvider theme="dark" template="react" files={files}>
        <Navbar onChatToggle={() => setIsChatOpen(!isChatOpen)} />
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

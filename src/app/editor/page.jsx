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
import { AnimatePresence } from "framer-motion";
import Navbar from "@/Components/Navbar";
import ChatPanel from "@/Components/ChatPanel";
import SyncButton from "@/Components/SyncCodes";
import CustomFileExplorer from "@/Components/Explorer";

function Page() {
  const { files, updateCode, setFiles } = useCodeStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div>
      <SandpackProvider theme="dark" template="react" files={files}>
        <Navbar
          onChatToggle={() => setIsChatOpen(!isChatOpen)}
          chatOpen={isChatOpen}
        />
        <SandpackLayout>
          <CustomFileExplorer />
          <div className="relative flex-1">
            <SandpackCodeEditor
              style={{ height: "100vh" }}
              showInlineErrors={true}
              showLineNumbers={true}
              showRunButton={true}
              wrapContent={true}
            />
            <div className="absolute top-12 right-2">
              <SyncButton />
            </div>
          </div>
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

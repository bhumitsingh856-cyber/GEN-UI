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

import Navbar from "@/Components/Navbar";

function Page() {
  const { files } = useCodeStore();

  return (
    <div>
      <SandpackProvider theme="dark" template="react" files={files}>
        <Navbar/>
        <SandpackLayout>
          <SandpackFileExplorer style={{ height: "100vh" }} />

          <SandpackCodeEditor
            style={{ height: "100vh" }}
            showInlineErrors={true}
            showLineNumbers={true}
            showRunButton={true}
          />
          <SandpackPreview
            style={{ height: "100vh" }}
            showRefreshButton={true}
            showOpenInCodeSandbox={true} // hide their branding btn
            showNavigator={true}
          />
        </SandpackLayout>
        <SandpackConsole/>
      </SandpackProvider>
    </div>
  );
}

export default Page;

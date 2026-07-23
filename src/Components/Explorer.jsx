// Components/CustomFileExplorer.jsx
"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";
import {
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
} from "lucide-react";

// ── Helper: Build folder structure ──
function buildTree(files) {
  const tree = {};

  Object.keys(files).forEach((path) => {
    const parts = path.split("/").filter(Boolean);
    let current = tree;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      if (!current[part]) {
        current[part] = isFile
          ? { type: "file", path }
          : { type: "folder", children: {} };
      }
      if (!isFile) {
        current = current[part].children;
      }
    });
  });

  return tree;
}

function FileTreeNode({
  name,
  node,
  level,
  activeFile,
  onSelect,
  onDelete,
  onAdd,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  if (node.type === "file") {
    const isActive = node.path === activeFile;
    return (
      <div
        className={`group flex items-center justify-between px-2 py-1 rounded cursor-pointer text-xs transition ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/50 hover:text-white/80 hover:bg-white/5"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(node.path)}
      >
        <span className="flex items-center gap-1.5">
          <File size={12} className="text-white/30" />
          {name}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.path);
          }}
          className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
        >
          <X size={12} />
        </button>
      </div>
    );
  }

  // Folder
  const children = Object.entries(node.children || {});
  const hasChildren = children.length > 0;

  return (
    <div>
      {/* Folder Header */}
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-xs transition hover:bg-white/5 ${
          isOpen ? "text-white/80" : "text-white/40"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {isOpen ? (
          <FolderOpen size={14} className="text-cyan-400" />
        ) : (
          <Folder size={14} className="text-cyan-400/60" />
        )}
        <span>{name}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowInput(!showInput);
          }}
          className="ml-auto text-white/20 hover:text-white/60"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Add File Input inside folder */}
      {showInput && (
        <div
          className="flex gap-1 mt-1"
          style={{ paddingLeft: `${level * 16 + 32}px` }}
        >
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const path = `/${name}/${newFileName}`;
                onAdd(path, `// ${newFileName}`);
                setNewFileName("");
                setShowInput(false);
              }
            }}
            placeholder="file.js"
            className="flex-1 bg-white/5 text-white/80 text-xs px-2 py-0.5 rounded outline-none border border-white/10"
            autoFocus
          />
          <button
            onClick={() => {
              const path = `/${name}/${newFileName}`;
              onAdd(path, `// ${newFileName}`);
              setNewFileName("");
              setShowInput(false);
            }}
            className="px-2 bg-white/10 rounded text-xs hover:bg-white/20"
          >
            Add
          </button>
        </div>
      )}

      {/* Children */}
      {isOpen && hasChildren && (
        <div>
          {children.map(([childName, childNode]) => (
            <FileTreeNode
              key={childName}
              name={childName}
              node={childNode}
              level={level + 1}
              activeFile={activeFile}
              onSelect={onSelect}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ──
function CustomFileExplorer() {
  const { sandpack } = useSandpack();
  const { files, activeFile, setActiveFile, addFile, deleteFile } = sandpack;
  const [rootInput, setRootInput] = useState("");
  const [showRootInput, setShowRootInput] = useState(false);

  const tree = buildTree(files);

  const handleAdd = (path, content) => {
    if (!files[path]) {
      addFile(path, content || `// ${path.split("/").pop()}`);
    }
  };

  const handleDelete = (path) => {
    const essential = ["/App.js", "/index.js", "/package.json"];
    if (essential.includes(path)) {
      alert("Cannot delete essential file");
      return;
    }
    if (confirm(`Delete "${path.split("/").pop()}"?`)) {
      deleteFile(path);
    }
  };

  const handleRootAdd = () => {
    if (!rootInput.trim()) return;
    const path = rootInput.startsWith("/") ? rootInput : `/${rootInput}`;
    if (!files[path]) {
      addFile(path, `// ${rootInput}`);
      setActiveFile(path);
    }
    setRootInput("");
    setShowRootInput(false);
  };

  return (
    <div className="h-screen bg-[#0a0a0f] p-3 min-w-[220px] border-r border-white/5 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold">
          Explorer
        </span>
        <button
          onClick={() => setShowRootInput(!showRootInput)}
          className="text-white/30 hover:text-white/60 transition"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Root Add File */}
      {showRootInput && (
        <div className="flex gap-1 mb-2 px-1">
          <input
            type="text"
            value={rootInput}
            onChange={(e) => setRootInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRootAdd()}
            placeholder="file.js or folder/file.js"
            className="flex-1 bg-white/5 text-white/80 text-xs px-2 py-1 rounded outline-none border border-white/10"
            autoFocus
          />
          <button
            onClick={handleRootAdd}
            className="px-2 bg-white/10 rounded text-xs hover:bg-white/20"
          >
            Add
          </button>
        </div>
      )}

      {/* File Tree */}
      {Object.entries(tree).map(([name, node]) => (
        <FileTreeNode
          key={name}
          name={name}
          node={node}
          level={0}
          activeFile={activeFile}
          onSelect={setActiveFile}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      ))}

      {/* Empty State */}
      {Object.keys(tree).length === 0 && (
        <div className="text-center text-white/20 text-xs py-8">
          No files or folders
        </div>
      )}

      {/* Count */}
      <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-white/20">
        {Object.keys(files).length} files
      </div>
    </div>
  );
}

export default CustomFileExplorer;

// app/projects/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Folder,
  Trash2,
  ExternalLink,
  Clock,
  ArrowLeft,
  FileCode,
} from "lucide-react";
import { useCodeStore } from "@/store/zustand";
import { getProjects } from "@/actions/getProjects";

function ProjectsPage() {
  const router = useRouter();
  const { allProjects, setAllProjects, setFiles, setCurrentProjectID } =
    useCodeStore();
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setAllProjects(data.projects || []);
    setLoading(false);
  };

  const loadProject = (project) => {
    const projectFiles = project.code || project.files || {};
    setFiles(projectFiles);
    setCurrentProjectID(project._id || project.id);
    router.push("/editor");
  };

  const handleDelete = async (projectId) => {
    if (!confirm("Delete this project?")) return;
    console.log("Delete project", projectId);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const colors = [
    {
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/5",
      hover: "hover:border-cyan-500/40",
      accent: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
    },
    {
      border: "border-purple-500/20",
      bg: "bg-purple-500/5",
      hover: "hover:border-purple-500/40",
      accent: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
      hover: "hover:border-emerald-500/40",
      accent: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    {
      border: "border-orange-500/20",
      bg: "bg-orange-500/5",
      hover: "hover:border-orange-500/40",
      accent: "text-orange-400",
      iconBg: "bg-orange-500/10",
    },
    {
      border: "border-rose-500/20",
      bg: "bg-rose-500/5",
      hover: "hover:border-rose-500/40",
      accent: "text-rose-400",
      iconBg: "bg-rose-500/10",
    },
    {
      border: "border-indigo-500/20",
      bg: "bg-indigo-500/5",
      hover: "hover:border-indigo-500/40",
      accent: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-sm transition group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 transition"
              />
              Back
            </Link>
            <div className="flex items-center gap-3 mt-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Folder className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-white">Projects</h1>
                <p className="text-white/30 text-sm">
                  {allProjects.length} project
                  {allProjects.length !== 1 ? "s" : ""} saved
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl text-cyan-400 text-sm font-medium transition-all duration-200"
          >
            <Plus size={16} />
            New Project
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-48">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-white/10 text-xs">Loading...</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && allProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-80"
          >
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-5">
              <Folder className="w-7 h-7 text-cyan-400/40" />
            </div>
            <p className="text-white/30 text-sm font-medium">No projects yet</p>
            <p className="text-white/15 text-xs mt-1">
              Create your first project to get started
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg text-cyan-400/70 text-sm transition"
            >
              <Plus size={14} />
              Create Project
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        {!loading && allProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allProjects.map((project, index) => {
              const color = colors[index % colors.length];
              const fileCount = Object.keys(
                project.code || project.files || {},
              ).length;
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={`group relative bg-white/[0.03] border ${color.border} ${color.hover} rounded-xl p-5 transition-all duration-200 hover:bg-white/[0.06]`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => loadProject(project)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white/90 text-sm font-medium truncate pr-4">
                          {project.prompt || "Untitled"}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1.5 text-white/25 text-xs">
                            <Clock size={12} />
                            {getRelativeTime(project.updatedAt)}
                          </span>
                          <span className="text-white/15 text-xs flex items-center gap-1.5">
                            <FileCode size={11} />
                            {fileCount} {fileCount === 1 ? "file" : "files"}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-lg ${color.iconBg} border ${color.border} flex items-center justify-center`}
                      >
                        <Folder className={`w-4 h-4 ${color.accent}`} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span
                      className={`text-[10px] ${color.accent}/30 group-hover:${color.accent}/60 transition`}
                    >
                      Open project →
                    </span>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => loadProject(project)}
                        className={`p-1.5 text-white/20 hover:${color.accent} hover:bg-white/5 rounded-lg transition`}
                        title="Open"
                      >
                        <ExternalLink size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="p-1.5 text-white/10 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between text-white/10 text-xs">
          <span>{allProjects.length} projects</span>
          <span>GenUI</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;

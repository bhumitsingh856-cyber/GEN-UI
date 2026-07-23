// Components/Loader.jsx
"use client";

function Loader() {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0f]">
      {/* Sidebar skeleton */}
      <div className="w-[200px] h-full border-r border-white/5 p-4">
        <div className="h-4 w-16 bg-white/5 rounded animate-pulse mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-full bg-white/5 rounded animate-pulse mb-2" />
        ))}
      </div>

      {/* Editor skeleton */}
      <div className="flex-1 p-4">
        <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-full bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Preview skeleton */}
      <div className="w-[300px] h-full border-l border-white/5 p-4">
        <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
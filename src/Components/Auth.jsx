import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { User  } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react"; 
function Auth({ limit }) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Show when="signed-out">
        <SignInButton>
          <button
            className="text-[13px] text-white flex underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
            onClick={() => setOpen(false)}
          >
            <User className="w-4 h-4 mr-1 group-hover:text-cyan-400" />
            <span className="group-hover:text-cyan-400">Sign</span>
            <span className="text-cyan-400">In</span>
          </button>
        </SignInButton>
        <SignUpButton>
          <button
            className="text-[13px] text-white flex underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
            onClick={() => setOpen(false)}
          >
            <span className="group-hover:text-cyan-400">Sign</span>
            <span className="text-cyan-400">Up</span>
          </button>
        </SignUpButton>
      </Show>
      {!user && limit && (
        <div className="text-[13px] text-white flex underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group">
          <span className="group-hover:text-red-400">Free Limit</span>
          <span className="text-red-400 ml-2">{limit}</span>
        </div>
      )}

      <Show when="signed-in">
       
        <UserButton />
      </Show>
    </>
  );
}

export default Auth;

"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { createUser } from "@/actions/createUser";

export default function UserSync() {
  const { user } = useUser();

  useEffect(() => { 
    if (!user) return;
    const syncUser = async () => {
      try {
        const clerkID = user.id;
        const email = user.emailAddresses[0]?.emailAddress;
        const name = user.firstName || "";
        
        await createUser(clerkID, email, name);
      } catch (error) {
        console.error("Failed to sync user to database:", error);
      }
    };

    syncUser();
  }, [user]);  

  return null;  
}

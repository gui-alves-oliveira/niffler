"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("sai");
    authClient.signOut();
    router.push("/auth/sign-in");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
      <span>Niffler</span>
      <Button variant="secondary" onClick={handleLogout}>
        Sair
      </Button>
    </header>
  );
}

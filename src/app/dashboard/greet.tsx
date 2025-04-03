"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Greet() {
  const router = useRouter();
  const session = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut();
    router.push("/auth/sign-in");
  };

  return (
    <div>
      <p>hello {session.data?.user.name}!</p>

      <button onClick={handleSignOut}>Sair</button>
    </div>
  );
}

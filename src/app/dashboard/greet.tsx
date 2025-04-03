"use client";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";

export function Greet() {
  const router = useRouter();
  const session = authClient.useSession();

  const users = trpc.users.useQuery();

  const handleSignOut = () => {
    authClient.signOut();
    router.push("/auth/sign-in");
  };

  return (
    <div>
      <p>hello {session.data?.user.name}!</p>

      <button onClick={handleSignOut}>Sair</button>

      {users.data?.map((user) => {
        return (
          <div key={user.hello}>
            <p>{user.hello}</p>
          </div>
        );
      })}
    </div>
  );
}

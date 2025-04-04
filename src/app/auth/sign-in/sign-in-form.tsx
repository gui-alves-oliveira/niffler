"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SignInForm() {
  const signInForm = useForm({});
  const [signInFromDisabled, setSignInFromDisabled] = useState(false);

  const router = useRouter();

  const handleSignUp = (data: any) => {
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setSignInFromDisabled(true);
        },
        onError: ({ error }) => {
          console.log(error.message);
          setSignInFromDisabled(false);
        },
        onSuccess: () => {
          signInForm.reset();
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <div className="p-6">
      <form onSubmit={signInForm.handleSubmit(handleSignUp)}>
        <fieldset className="space-y-4" disabled={signInFromDisabled}>
          <div>
            <label htmlFor="">E-mail</label>
            <Input {...signInForm.register("email")} type="text" />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <Input {...signInForm.register("password")} type="text" />
          </div>

          <Button>Entrar</Button>
        </fieldset>
      </form>
    </div>
  );
}

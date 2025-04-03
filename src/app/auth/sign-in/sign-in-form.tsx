"use client";

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
      }
    );
  };

  return (
    <div>
      <form onSubmit={signInForm.handleSubmit(handleSignUp)}>
        <fieldset disabled={signInFromDisabled}>
          <div>
            <label htmlFor="">E-mail</label>
            <input {...signInForm.register("email")} type="text" />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input {...signInForm.register("password")} type="text" />
          </div>

          <button>Entrar</button>
        </fieldset>
      </form>
    </div>
  );
}

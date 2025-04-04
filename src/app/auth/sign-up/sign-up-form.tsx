"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SignUpForm() {
  const signUpForm = useForm({});
  const [signUpFromDisabled, setSignUpFromDisabled] = useState(false);
  const handleSignUp = (data: any) => {
    authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: () => {
          setSignUpFromDisabled(true);
        },
        onError: () => {
          setSignUpFromDisabled(false);
        },
        onSuccess: () => {
          signUpForm.reset();
        },
      },
    );
  };

  return (
    <div>
      <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
        <fieldset disabled={signUpFromDisabled}>
          <div>
            <label htmlFor="">E-mail</label>
            <input {...signUpForm.register("email")} type="text" />
          </div>

          <div>
            <label htmlFor="">Name</label>
            <input {...signUpForm.register("name")} type="text" />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input {...signUpForm.register("password")} type="text" />
          </div>

          <button>Registrar-se</button>
        </fieldset>
      </form>

      <button onClick={() => authClient.signOut()}>sair</button>
    </div>
  );
}

"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignupForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  {
    /*every time we submit a form, we trigger the action that calls the signup function */
  }
  return (
    <form action={action} className="flex flex-col gap-2 ">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Juan Gomez"
          className="w-full"
          defaultValue={state?.data.name}
        />
      </div>
      {state?.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="juan@example.com"
          className="w-full"
          defaultValue={state?.data.email}
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          className="w-full"
          defaultValue={state?.data.name}
        />
      </div>
      {state?.errors?.password && (
        <div className="text-red-500 text-sm">
          <p>La contraseña:</p>
          <ul>
            {state.errors.password.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton>Registrarse</SubmitButton>
    </form>
  );
};

export default SignupForm;

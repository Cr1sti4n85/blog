"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import React, { useActionState } from "react";

const SigninForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label defaultValue={state?.data.email} htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
        />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}
      <div>
        <Label defaultValue={state?.data.password} htmlFor="password">
          Password
        </Label>
        <Input type="password" id="password" name="password" required />
      </div>
      {!!state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <SubmitButton>Iniciar sesión</SubmitButton>
    </form>
  );
};

export default SigninForm;

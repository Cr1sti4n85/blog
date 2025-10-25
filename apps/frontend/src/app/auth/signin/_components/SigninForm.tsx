"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const SigninForm = () => {
  return (
    <form className="flex flex-col gap-2">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" required />
      </div>
      <SubmitButton>Iniciar sesión</SubmitButton>
    </form>
  );
};

export default SigninForm;

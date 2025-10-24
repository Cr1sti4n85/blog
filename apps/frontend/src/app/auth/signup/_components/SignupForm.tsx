"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupForm = () => {
  return (
    <form className="flex flex-col gap-2 ">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Juan Gomez"
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="juan@example.com"
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          className="w-full"
        />
      </div>
      <SubmitButton>Registrarse</SubmitButton>
    </form>
  );
};

export default SignupForm;

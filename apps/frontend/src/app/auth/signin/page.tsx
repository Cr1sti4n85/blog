import Link from "next/link";
import React from "react";
import SigninForm from "./_components/SigninForm";

const SigninPage = () => {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center items-center gap-3">
      <h1 className="text-center text-2xl font-bold mb-4">Inicia sesión</h1>
      {/* Sign-in form elements would go here */}
      <SigninForm />
      <Link href={"/auth/forgot"}>¿Olvidaste tu contraseña?</Link>
    </div>
  );
};

export default SigninPage;

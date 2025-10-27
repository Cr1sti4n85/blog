import Link from "next/link";

const SigninPanel = () => {
  return (
    <>
      <Link href={"/auth/signin"}>Inicia sesión</Link>
      <Link href={"/auth/signup"}>Registrarse</Link>
    </>
  );
};

export default SigninPanel;

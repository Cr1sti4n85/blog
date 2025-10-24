import Link from "next/link";
import SignupForm from "./_components/SignupForm";

const SignupPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold mb-4">Signup Page</h2>
      <SignupForm />
      <div>
        <p>¿Ya tienes cuenta?</p>
        <Link href="/auth/signin" className="text-blue-500 hover:underline">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;

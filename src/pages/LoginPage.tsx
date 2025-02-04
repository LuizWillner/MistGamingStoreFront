import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <div className="mb-4">
        <h3>Faça o Login</h3>
        <hr className="mt-0" />
      </div>

      <LoginForm />
    </>
  );
};

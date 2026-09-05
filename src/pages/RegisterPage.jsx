import RegisterForm from "../components/auth/RegisterForm";
import "./RegisterPage.css";

export default function RegisterPage() {
  const handleRegister = async (data) => {
    // Reemplazar por la petición HTTP del backend cuando esté disponible.
    // await authService.register(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return data;
  };

  return (
    <main className="register-page-view">
      <RegisterForm onSubmit={handleRegister} />
    </main>
  );
}
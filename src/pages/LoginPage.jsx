import "./LoginPage.css";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const handleLogin = async (credentials) => {
    // Reemplazar por la petición HTTP del backend cuando esté disponible.
    // await authService.login(credentials);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return credentials;
  };

  return (
    <main className="login-page">
      <section className="login-page__card">
        <p className="login-page__eyebrow">Consulir App</p>

        <h1>Ingresar</h1>

        <p>
          Accedé a tu cuenta para gestionar tus ingresos, egresos y resultados.
        </p>

        <LoginForm onSubmit={handleLogin} />
      </section>
    </main>
  );
}

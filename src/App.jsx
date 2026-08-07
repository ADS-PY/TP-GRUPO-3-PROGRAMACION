import AuthCard from "./components/auth/AuthCard";
import InfoCard from "./components/cards/InfoCard";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
  const handleLogin = () => {
    console.log("Click en Ingresar");
  };

  const handleRegister = () => {
    console.log("Click en Registrar");
  };

  return (
    <div className="app-layout">
      <main className="app-page">
        <div className="app-content">
          <AuthCard onLogin={handleLogin} onRegister={handleRegister} />

          <section className="info-card-grid" aria-label="Información destacada">
            <InfoCard
              icon="monitoring"
              title="Mercado Hoy"
              description="Consultá información clave para entender mejor tus decisiones financieras."
              variant="primary"
            />

            <InfoCard
              icon="shield_lock"
              title="Seguridad Total"
              description="Tus datos se gestionan con foco en privacidad, acceso seguro y buenas prácticas."
              variant="secondary"
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
import AuthCard from "./components/auth/AuthCard";
import InfoCard from "./components/cards/InfoCard";
import Footer from "./components/layout/Footer";
import StatsBar from "./components/stats/StatsBar";
import "./App.css";

const landingStats = [
  {
    value: "+500",
    label: "Usuarios proyectados",
  },
  {
    value: "100%",
    label: "Control financiero",
  },
  {
    value: "24/7",
    label: "Acceso a la plataforma",
  },
  {
    value: "ARS",
    label: "Moneda principal",
  },
];

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

          <div className="app-side-content">
            <section className="info-card-grid" aria-label="Información destacada">
              <InfoCard
                icon="monitoring"
                title="Mercado Hoy"
                description="Visualizá información clave para entender mejor tus decisiones financieras."
                variant="primary"
              />

              <InfoCard
                icon="shield_lock"
                title="Seguridad Total"
                description="Accedé a una experiencia pensada para proteger tus datos y mejorar tu control financiero."
                variant="secondary"
              />
            </section>

            <StatsBar stats={landingStats} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
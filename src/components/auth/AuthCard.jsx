import consulirLogo from "../../assets/brand/consulir-logo.png";
import "./AuthCard.css";

export default function AuthCard({ onLogin, onRegister }) {
  return (
    <section className="auth-card" aria-labelledby="auth-card-title">
      <div className="auth-card__brand">
        <div className="auth-card__logo" aria-hidden="true">
          <img
  src={consulirLogo}
  alt="Consulir"
  className="auth-card__logo-image"
/>
        </div>

        <div>
          <p className="auth-card__eyebrow">Consulir App</p>
          <h1 id="auth-card-title" className="auth-card__title">
            Gestioná tus finanzas con claridad
          </h1>
        </div>
      </div>

      <p className="auth-card__description">
        Registrá tus ingresos y egresos, visualizá tu resultado mensual y tomá
        mejores decisiones sobre ahorro, inversión o consumo.
      </p>

      <div className="auth-card__actions">
        <button
          type="button"
          className="auth-card__button auth-card__button--primary"
          onClick={onLogin}
        >
          Ingresar
        </button>

        <button
          type="button"
          className="auth-card__button auth-card__button--secondary"
          onClick={onRegister}
        >
          Registrar
        </button>
      </div>

      <div className="auth-card__links" aria-label="Enlaces secundarios">
        <a href="#" className="auth-card__link">
          Ayuda
        </a>

        <span aria-hidden="true">•</span>

        <a href="#" className="auth-card__link">
          Soporte técnico
        </a>
      </div>
    </section>
  );
}
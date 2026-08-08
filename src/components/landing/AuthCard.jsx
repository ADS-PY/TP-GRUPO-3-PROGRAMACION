// src/components/landing/AuthCard.jsx
import PropTypes from 'prop-types';

function AuthCard({ onLogin, onRegister }) {
  return (
    <div className="md:col-span-8 glass-card p-2xl rounded-xl shadow-lg flex flex-col justify-center">
      <h2 className="font-headline-lg text-headline-lg text-primary mb-md">
        Bienvenido a Consulir
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant mb-xl max-w-lg">
        Acceda a su panel de control personalizado para gestionar sus activos y
        visualizar informes en tiempo real.
      </p>
      {/* Action buttons */}
      <div className="flex flex-wrap gap-lg">
        <button
          type="button"
          onClick={onLogin}
          className="flex items-center gap-sm px-12 py-4 bg-primary text-on-primary text-headline-md font-semibold rounded-xl shadow-lg hover:bg-primary-container transition-all active:scale-95 group"
        >
          Ingresar
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
        <button
          type="button"
          onClick={onRegister}
          className="px-12 py-4 bg-white border-2 border-primary text-primary text-headline-md font-semibold rounded-xl hover:bg-primary/5 transition-all active:scale-95"
        >
          Registrar
        </button>
      </div>
      {/* Help links */}
      <div className="mt-xl flex items-center gap-md">
        <a
          href="#"
          className="text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs"
        >
          <span className="material-symbols-outlined text-[18px]">help_outline</span>
          ¿Necesita ayuda con su cuenta?
        </a>
        <span className="text-outline-variant">|</span>
        <a
          href="#"
          className="text-body-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          Soporte Técnico
        </a>
      </div>
    </div>
  );
}

AuthCard.propTypes = {
  onLogin: PropTypes.func,
  onRegister: PropTypes.func,
};

export default AuthCard;

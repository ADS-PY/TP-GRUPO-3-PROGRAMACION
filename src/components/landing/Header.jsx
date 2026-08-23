// src/components/landing/Header.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// ─── Constantes por defecto ───────────────────────────────────────────────────

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OEDm1mcfNsNHTKHxW_6B_dEHKrwJfsaKfQhjiCb4qmzxkfK7vxdlQCcMGspDcRtGIt7GIJd-y9VyauMOxi-R6Ykr4lHDN_HxYnXhIQcibwwF4o8I5xKOaLWSf_mKgaLlwDfRW126VzZe2zff4mAlLauXADMSl2nNRiqmGMtTPP9WwRAUhoKEDq6vBHyb8_PhwpVj7B45AYBlUCpJTJhFEMfSyryWCustLsNc6UswUgQJrnj0S2IHIw9xiocMVtIsCKXBP7mWs9LT';

/** Enlaces de navegación que se muestran si no se reciben propiedades */
const DEFAULT_NAV_LINKS = [
  { label: 'Servicios', href: '#servicios', active: true },
  { label: 'Nosotros',  href: '#nosotros',  active: false },
  { label: 'Contacto',  href: '#contacto',  active: false },
];

// ─── Hook: detecta si el usuario hizo scroll ─────────────────────────────────

/**
 * useScrolled
 * Devuelve `true` cuando el scroll vertical supera `threshold` px.
 * Usa { passive: true } para no bloquear el hilo principal.
 */
function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    // Estado inicial por si la página carga en posición intermedia
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

// ─── Componente Header ────────────────────────────────────────────────────────

/**
 * Header
 *
 * Barra de navegación fija, reutilizable en cualquier vista de la app.
 *
 * Props:
 * ┌─────────────────┬───────────────────────────────────────────────────┐
 * │ navLinks        │ Arreglo de { label, href, active? } para la nav.  │
 * │ logoUrl         │ URL del logo (reemplaza el valor por defecto).     │
 * │ logoAlt         │ Texto alternativo del logo.                        │
 * │ onLoginClick    │ Función del botón "Ingresar".                     │
 * │ loginLabel      │ Etiqueta del CTA (por defecto: "Ingresar").       │
 * │ scrollThreshold │ Píxeles de scroll antes de aplicar sombra/blur.   │
 * └─────────────────┴───────────────────────────────────────────────────┘
 */
function Header({
  navLinks = DEFAULT_NAV_LINKS,
  logoUrl = LOGO_URL,
  logoAlt = 'Consulir',
  onLoginClick,
  loginLabel = 'Ingresar',
  scrollThreshold = 50,
}) {
  const scrolled = useScrolled(scrollThreshold);

  return (
    <header
      role="banner"
      className={[
        // Base: posición fija, color de fondo primario, altura y padding
        'fixed top-0 left-0 w-full z-50',
        'px-margin-desktop h-20',
        'flex items-center justify-between',
        'bg-primary',
        // Transición suave para todos los cambios visuales
        'transition-all duration-300 ease-in-out',
        // Efecto scroll: sombra + blur + leve opacidad
        scrolled
          ? 'shadow-lg shadow-black/20 backdrop-blur-md bg-opacity-[0.97]'
          : 'shadow-none backdrop-blur-none bg-opacity-100',
      ].join(' ')}
    >
      {/* ── Logo / Marca ─────────────────────────────────── */}
      <a href="/" aria-label="Ir al inicio" className="flex items-center gap-md shrink-0">
        <img
          src={logoUrl}
          alt={logoAlt}
          className="h-10 w-auto object-contain brightness-0 invert"
        />
      </a>

      {/* ── Navegación para escritorio ───────────────────── */}
      <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-xl">
        {navLinks.map(({ label, href, active }) => (
          <a
            key={label}
            href={href}
            className={[
              'font-body-md transition-opacity duration-150',
              active
                ? 'text-on-primary opacity-100 hover:opacity-90'
                : 'text-on-primary opacity-70 hover:opacity-100',
            ].join(' ')}
          >
            {label}
          </a>
        ))}

        {/* CTA Ingresar */}
        <button
          type="button"
          onClick={onLoginClick}
          className={[
            'bg-white text-primary font-semibold',
            'px-lg py-2 rounded-xl',
            'hover:bg-surface-bright',
            'transition-all duration-150 active:scale-95',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
          ].join(' ')}
        >
          {loginLabel}
        </button>
      </nav>

      {/* ── Menú hamburguesa (móvil) ─────────────────────── */}
      <button
        type="button"
        aria-label="Abrir menú"
        className="md:hidden text-on-primary p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}

// ─── PropTypes ────────────────────────────────────────────────────────────────

Header.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href:  PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ),
  logoUrl:         PropTypes.string,
  logoAlt:         PropTypes.string,
  onLoginClick:    PropTypes.func,
  loginLabel:      PropTypes.string,
  scrollThreshold: PropTypes.number,
};

export default Header;

// src/components/landing/HeroSection.jsx
import PropTypes from 'prop-types';

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OEDm1mcfNsNHTKHxW_6B_dEHKrwJfsaKfQhjiCb4qmzxkfK7vxdlQCcMGspDcRtGIt7GIJd-y9VyauMOxi-R6Ykr4lHDN_HxYnXhIQcibwwF4o8I5xKOaLWSf_mKgaLlwDfRW126VzZe2zff4mAlLauXADMSl2nNRiqmGMtTPP9WwRAUhoKEDq6vBHyb8_PhwpVj7B45AYBlUCpJTJhFEMfSyryWCustLsNc6UswUgQJrnj0S2IHIw9xiocMVtIsCKXBP7mWs9LT';

const DEFAULT_BG_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOIm_FyiOpWGPJWedxauk09UIU3C0HdcbgXZdwdaKjMUmgSMqUyQM_qUOiUnYzQ2ckq83mNN94EYYkav0BJyZvr5vG565mef6NAg6iunTpUbnei3bXfBpEkiC9tdDPSXoR3qwpTWq-stjp1R7u_e5UBe0-ekZ160SWUtCos5dH-T80ZOTTqp8tECiLOUUBTPoldUsio_o99kRyBX7gfWeJAjRaJXnAb84iDCsgAgu4krpXQVsPtkd5MUafC3Ao38PAq0jfShdTODR';

// ─── Componente HeroSection ───────────────────────────────────────────────────

/**
 * HeroSection
 *
 * Sección hero parametrizable, reutilizable en cualquier vista.
 *
 * Props:
 * ┌───────────────────┬────────────────────────────────────────────────────────┐
 * │ title             │ Título principal (h1). String o nodo JSX.              │
 * │ subtitle          │ Subtítulo/bajada. String o nodo JSX.                   │
 * │ logoUrl           │ URL del logo centrado sobre el título.                 │
 * │ logoAlt           │ Texto alternativo del logo.                            │
 * │ showLogo          │ Mostrar u ocultar el logo (default: true).             │
 * │ backgroundUrl     │ URL de imagen de fondo (superpuesta al gradiente).     │
 * │ backgroundOpacity │ Opacidad de la imagen de fondo (0–100, default: 10).  │
 * │ minHeight         │ Altura mínima de la sección (clase Tailwind o CSS).    │
 * │ children          │ Contenido extra renderizado debajo del subtítulo.      │
 * └───────────────────┴────────────────────────────────────────────────────────┘
 *
 * Ejemplo de uso — Landing page (default):
 *   <HeroSection
 *     title="Gestión de Alto Impacto"
 *     subtitle="Potenciamos su crecimiento institucional..."
 *   />
 *
 * Ejemplo de uso — Dashboard interno (sin logo, height menor):
 *   <HeroSection
 *     title="Bienvenido, Juan"
 *     subtitle="Resumen de su cartera al día de hoy"
 *     showLogo={false}
 *     minHeight="h-[30vh]"
 *   />
 */
function HeroSection({
  title = 'Gestión de Alto Impacto',
  subtitle = 'Potenciamos su crecimiento institucional con precisión matemática y visión estratégica de mercado.',
  logoUrl = DEFAULT_LOGO_URL,
  logoAlt = 'Consulir Logo',
  showLogo = true,
  backgroundUrl = DEFAULT_BG_URL,
  backgroundOpacity = 10,
  minHeight = 'h-[65vh]',
  children,
}) {
  return (
    <section
      aria-label="Sección hero"
      className={[
        'relative kinetic-gradient hero-curve',
        'flex flex-col items-center justify-center',
        'overflow-hidden',
        // ── Responsive height ──────────────────────────
        // En mobile usamos min-h en lugar de h fija para que
        // el contenido nunca quede recortado.
        'min-h-[320px] md:min-h-0',
        minHeight,
      ].join(' ')}
    >
      {/* ── Imagen de fondo (pattern / foto) ─────────── */}
      {backgroundUrl && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url('${backgroundUrl}')`,
            opacity: backgroundOpacity / 100,
          }}
        />
      )}

      {/* ── Contenido principal ───────────────────────── */}
      <div className="relative z-10 animate-fade-in w-full flex flex-col items-center text-center px-margin-mobile md:px-margin-desktop">
        <div className="max-w-4xl w-full mx-auto">

          {/* Logo (opcional) */}
          {showLogo && logoUrl && (
            <img
              src={logoUrl}
              alt={logoAlt}
              className={[
                'brightness-0 invert mx-auto mb-xl',
                // Responsive: logo más pequeño en mobile
                'h-20 md:h-32',
              ].join(' ')}
            />
          )}

          {/* Título h1 */}
          <h1
            className={[
              'text-on-primary font-display-lg mb-md',
              // Responsive typography: headline-lg-mobile en mobile, display-lg en desktop
              'text-headline-lg-mobile md:text-display-lg',
              'font-headline-lg-mobile md:font-display-lg',
            ].join(' ')}
          >
            {title}
          </h1>

          {/* Subtítulo */}
          {subtitle && (
            <p className="text-on-primary/90 font-body-lg text-body-md md:text-body-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Slot para contenido extra (CTA buttons, etc.) */}
          {children && (
            <div className="mt-xl">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── PropTypes ────────────────────────────────────────────────────────────────

HeroSection.propTypes = {
  title:             PropTypes.node,
  subtitle:          PropTypes.node,
  logoUrl:           PropTypes.string,
  logoAlt:           PropTypes.string,
  showLogo:          PropTypes.bool,
  backgroundUrl:     PropTypes.string,
  backgroundOpacity: PropTypes.number,
  minHeight:         PropTypes.string,
  children:          PropTypes.node,
};

export default HeroSection;

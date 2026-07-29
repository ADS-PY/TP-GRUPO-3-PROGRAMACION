// src/components/landing/HeroSection.jsx

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OEDm1mcfNsNHTKHxW_6B_dEHKrwJfsaKfQhjiCb4qmzxkfK7vxdlQCcMGspDcRtGIt7GIJd-y9VyauMOxi-R6Ykr4lHDN_HxYnXhIQcibwwF4o8I5xKOaLWSf_mKgaLlwDfRW126VzZe2zff4mAlLauXADMSl2nNRiqmGMtTPP9WwRAUhoKEDq6vBHyb8_PhwpVj7B45AYBlUCpJTJhFEMfSyryWCustLsNc6UswUgQJrnj0S2IHIw9xiocMVtIsCKXBP7mWs9LT';

const BG_PATTERN_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOIm_FyiOpWGPJWedxauk09UIU3C0HdcbgXZdwdaKjMUmgSMqUyQM_qUOiUnYzQ2ckq83mNN94EYYkav0BJyZvr5vG565mef6NAg6iunTpUbnei3bXfBpEkiC9tdDPSXoR3qwpTWq-stjp1R7u_e5UBe0-ekZ160SWUtCos5dH-T80ZOTTqp8tECiLOUUBTPoldUsio_o99kRyBX7gfWeJAjRaJXnAb84iDCsgAgu4krpXQVsPtkd5MUafC3Ao38PAq0jfShdTODR';

function HeroSection() {
  return (
    <section className="relative h-[65vh] kinetic-gradient hero-curve flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${BG_PATTERN_URL}')` }}
          aria-hidden="true"
        />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 text-center px-margin-desktop max-w-4xl animate-fade-in">
        <img
          src={LOGO_URL}
          alt="Consulir Logo"
          className="h-32 mx-auto mb-xl brightness-0 invert"
        />
        <h1 className="font-display-lg text-display-lg text-on-primary mb-md">
          Gestión de Alto Impacto
        </h1>
        <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto">
          Potenciamos su crecimiento institucional con precisión matemática y
          visión estratégica de mercado.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;

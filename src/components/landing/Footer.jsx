// src/components/landing/Footer.jsx

const FOOTER_LINKS = [
  { label: 'Support', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

function Footer() {
  return (
    <footer className="w-full mt-auto flex flex-col items-center gap-sm px-margin-desktop pb-margin-desktop bg-background border-t border-outline-variant py-lg">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-lg">
        {/* Marca */}
        <div className="flex items-center gap-md">
          <span className="font-label-md text-label-md text-primary font-bold">
            Consulir
          </span>
        </div>

        {/* Enlaces */}
        <div className="flex gap-xl">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Derechos de autor */}
        <div className="font-body-sm text-body-sm text-on-surface-variant">
          © 2026 Consulir. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

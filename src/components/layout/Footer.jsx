import "./Footer.css";

const defaultLinks = [
  {
    label: "Soporte",
    href: "#soporte",
  },
  {
    label: "Privacidad",
    href: "#privacidad",
  },
  {
    label: "Términos",
    href: "#terminos",
  },
];

export default function Footer({
  brandName = "Consulir App",
  links = defaultLinks,
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__content">
        <p className="footer__brand">
          {brandName}
        </p>

        <nav className="footer__nav" aria-label="Enlaces secundarios">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="footer__copy">
          © {currentYear} {brandName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
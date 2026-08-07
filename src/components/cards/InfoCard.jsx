import "./InfoCard.css";

export default function InfoCard({
  icon,
  title,
  description,
  variant = "primary",
}) {
  return (
    <article className={`info-card info-card--${variant}`}>
      <div className="info-card__icon" aria-hidden="true">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div className="info-card__content">
        <h2 className="info-card__title">{title}</h2>
        <p className="info-card__description">{description}</p>
      </div>
    </article>
  );
}
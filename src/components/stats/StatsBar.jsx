import "./StatsBar.css";

export default function StatsBar({ stats = [] }) {
  if (!stats.length) {
    return null;
  }

  return (
    <section className="stats-bar" aria-label="Estadísticas destacadas">
      <div className="stats-bar__grid">
        {stats.map((stat) => (
          <article className="stats-bar__item" key={`${stat.value}-${stat.label}`}>
            <strong className="stats-bar__value">{stat.value}</strong>
            <span className="stats-bar__label">{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
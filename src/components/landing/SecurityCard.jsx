// src/components/landing/SecurityCard.jsx
// Tarjeta "Seguridad Total"

function SecurityCard() {
  return (
    <div className="bg-surface-container-high p-lg rounded-xl border border-outline/10 group cursor-pointer hover:bg-surface-container-highest transition-colors">
      <div className="flex items-center justify-between mb-sm">
        <span
          className="material-symbols-outlined filled text-secondary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          security
        </span>
        <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
          chevron_right
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface">
        Seguridad Total
      </h3>
      <p className="font-body-sm text-on-surface-variant">
        Protección de grado institucional en cada transacción.
      </p>
    </div>
  );
}

export default SecurityCard;

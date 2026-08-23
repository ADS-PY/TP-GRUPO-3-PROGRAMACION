// src/components/landing/StatsBar.jsx

const STATS = [
  { value: '15k+', label: 'CLIENTES ACTIVOS' },
  { value: '$4.2B', label: 'ACTIVOS GESTIONADOS' },
  { value: '99.9%', label: 'TIEMPO DE ACTIVIDAD' },
  { value: '24/7', label: 'SOPORTE PREMIUM' },
];

function StatsBar() {
  return (
    <div className="mt-3xl grid grid-cols-2 md:grid-cols-4 gap-xl border-t border-outline-variant pt-2xl">
      {STATS.map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="font-headline-lg text-headline-lg text-primary">{value}</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;

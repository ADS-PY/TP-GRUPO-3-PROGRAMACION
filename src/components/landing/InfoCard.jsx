// src/components/landing/InfoCard.jsx
// Tarjeta "Mercado Hoy" — panel informativo de tendencias del mercado

function InfoCard() {
  return (
    <div className="bg-primary-fixed p-lg rounded-xl flex-grow border border-outline/10">
      <span
        className="material-symbols-outlined filled text-primary text-4xl mb-sm"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        insights
      </span>
      <h3 className="font-headline-md text-headline-md text-on-primary-fixed mb-xs">
        Mercado Hoy
      </h3>
      <p className="font-body-sm text-on-primary-fixed-variant">
        Tendencias alcistas en sectores tecnológicos y energía renovable.
      </p>
      {/* Barra de progreso */}
      <div className="mt-md h-2 bg-on-primary-fixed/10 rounded-full overflow-hidden">
        <div className="w-[75%] h-full kinetic-gradient" />
      </div>
    </div>
  );
}

export default InfoCard;

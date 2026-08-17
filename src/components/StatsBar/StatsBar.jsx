/**
 * StatsBar.jsx
 *
 * Muestra un resumen visual de las estadísticas financieras del período.
 * Consume datos a través del hook useStats, que internamente llama al
 * servicio getStats (mock temporal de GET /stats).
 */

import { useStats } from '../../hooks/useStats';
import './StatsBar.css';

/**
 * Formatea un número como moneda argentina (ARS).
 *
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
}

function StatsBar() {
  const { stats, loading, error } = useStats();

  if (loading) {
    return <p className="statsbar__loading">Cargando estadísticas…</p>;
  }

  if (error) {
    return <p className="statsbar__error" role="alert">Error: {error}</p>;
  }

  return (
    <div className="statsbar" role="region" aria-label="Estadísticas del período">
      <div className="statsbar__card">
        <span className="statsbar__label">Ingresos</span>
        <span className="statsbar__value statsbar__value--positive">
          {formatCurrency(stats.ingresos)}
        </span>
      </div>

      <div className="statsbar__card">
        <span className="statsbar__label">Gastos</span>
        <span className="statsbar__value statsbar__value--negative">
          {formatCurrency(stats.gastos)}
        </span>
      </div>

      <div className="statsbar__card">
        <span className="statsbar__label">Balance</span>
        <span
          className={`statsbar__value ${
            stats.balance >= 0 ? 'statsbar__value--positive' : 'statsbar__value--negative'
          }`}
        >
          {formatCurrency(stats.balance)}
        </span>
      </div>

      <div className="statsbar__card">
        <span className="statsbar__label">Transacciones</span>
        <span className="statsbar__value">{stats.transacciones}</span>
      </div>
    </div>
  );
}

export default StatsBar;

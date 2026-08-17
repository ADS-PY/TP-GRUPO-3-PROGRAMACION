/**
 * statsService.js
 *
 * Mock temporal del endpoint GET /stats.
 * Cuando el backend esté disponible, reemplazar `getStats` por una
 * llamada real a la API (fetch/axios) manteniendo la misma estructura
 * de respuesta documentada abajo.
 *
 * Estructura esperada por StatsBar:
 * {
 *   ingresos:    number,   // total de ingresos del período
 *   gastos:      number,   // total de gastos del período
 *   balance:     number,   // ingresos - gastos
 *   transacciones: number  // cantidad de transacciones registradas
 * }
 */

const MOCK_INGRESOS = 152000;
const MOCK_GASTOS = 87500;

const MOCK_STATS = {
  ingresos: MOCK_INGRESOS,
  gastos: MOCK_GASTOS,
  balance: MOCK_INGRESOS - MOCK_GASTOS,
  transacciones: 34,
};

/**
 * getStats — obtiene las estadísticas resumidas del período actual.
 *
 * Mock: resuelve inmediatamente con datos simulados.
 * Producción: GET /stats → { ingresos, gastos, balance, transacciones }
 *
 * @returns {Promise<{ingresos: number, gastos: number, balance: number, transacciones: number}>}
 */
export async function getStats() {
  // TODO: reemplazar por llamada real cuando el backend esté disponible
  // return fetch('/api/stats').then(res => res.json());
  return Promise.resolve(MOCK_STATS);
}

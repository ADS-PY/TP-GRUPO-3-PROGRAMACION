/**
 * useStats.js
 *
 * Custom hook que consume el servicio de estadísticas y expone
 * los datos al componente StatsBar (u otros consumidores).
 */

import { useState, useEffect } from 'react';
import { getStats } from '../services/statsService';

/**
 * useStats — recupera las estadísticas del período actual.
 *
 * @returns {{ stats: object|null, loading: boolean, error: string|null }}
 */
export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getStats()
      .then((data) => {
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? 'Error al obtener estadísticas');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}

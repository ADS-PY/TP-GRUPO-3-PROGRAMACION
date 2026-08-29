// Hook de autenticación: expone el usuario activo y el estado de carga.
// Escucha cambios de sesión de Supabase para mantener el estado sincronizado.
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

/**
 * @returns {{ user: object|null, loading: boolean }}
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener la sesión inicial al montar el componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuchar cambios de sesión (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

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
    // onAuthStateChange dispara INITIAL_SESSION de forma síncrona al suscribirse,
    // proveyendo la sesión actual sin necesidad de llamar a getSession por separado.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

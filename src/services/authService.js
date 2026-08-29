// Servicio de autenticación: registrar usuario, iniciar y cerrar sesión.
import { supabase } from './supabaseClient';

/**
 * Registra un nuevo usuario en Supabase Auth.
 * @param {{ nombre: string, email: string, password: string }} datos
 * @returns {{ data: object|null, error: string|null }}
 */
export async function registerUser({ nombre, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nombre },
    },
  });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Inicia sesión con email y contraseña.
 * @param {{ email: string, password: string }} credenciales
 * @returns {{ data: object|null, error: string|null }}
 */
export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Cierra la sesión activa.
 * @returns {{ error: string|null }}
 */
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
}

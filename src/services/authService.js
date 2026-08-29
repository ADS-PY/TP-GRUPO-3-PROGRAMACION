// Servicio de autenticación: comunica el frontend con el backend Express.
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Registra un nuevo usuario a través del backend.
 * @param {{ nombre: string, email: string, password: string }} datos
 * @returns {{ data: object|null, error: string|null, fieldErrors: object|null }}
 */
export async function registerUser({ nombre, email, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    const json = await response.json();

    if (response.ok) {
      return { data: json.data, error: null, fieldErrors: null };
    }

    // El backend devuelve errores de campo (400) o conflicto (409)
    return {
      data: null,
      error: json.message ?? 'Error al crear la cuenta.',
      fieldErrors: json.errors ?? null,
    };
  } catch {
    return {
      data: null,
      error: 'No se pudo conectar con el servidor. Intentá nuevamente.',
      fieldErrors: null,
    };
  }
}


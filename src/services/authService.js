import { getSupabaseClient } from "./supabaseClient";

const DEFAULT_REGISTER_ERROR_MESSAGE = "Ocurrió un error al crear la cuenta. Intentá nuevamente.";

const normalizeApiBaseUrl = (baseUrl) => baseUrl?.trim().replace(/\/+$/, "") || "";

const parseJsonResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

const createRequestError = ({ status, message, errors }) => {
  const error = new Error(message || DEFAULT_REGISTER_ERROR_MESSAGE);

  error.status = status;
  error.errors = Array.isArray(errors) ? errors : [];

  return error;
};

const buildSupabaseRegisterResponse = (data) => ({
  status: "success",
  message: data.session
    ? "Cuenta creada correctamente."
    : "Cuenta creada. Revisá tu correo para confirmarla antes de iniciar sesión.",
  data: {
    session: data.session ?? null,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          nombre: data.user.user_metadata?.nombre ?? null,
        }
      : null,
  },
  errors: [],
});

export async function registerUser({ nombre, email, password }) {
  const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

  if (apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
      throw createRequestError({
        status: response.status,
        message: result?.message,
        errors: result?.errors,
      });
    }

    return {
      status: result?.status || "success",
      message: result?.message || "Cuenta creada correctamente.",
      data: result?.data ?? null,
      errors: Array.isArray(result?.errors) ? result.errors : [],
    };
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
      },
    },
  });

  if (error) {
    throw error;
  }

  return buildSupabaseRegisterResponse(data);
}

export async function loginUser({ email, password }) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

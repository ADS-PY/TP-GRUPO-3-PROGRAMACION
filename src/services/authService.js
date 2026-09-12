import { getSupabaseClient } from "./supabaseClient";

export async function registerUser({ nombre, email, password }) {
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

  return data;
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

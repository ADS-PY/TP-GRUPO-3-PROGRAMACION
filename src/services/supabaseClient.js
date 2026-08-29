// Instancia única del cliente Supabase para toda la aplicación.
// Las variables de entorno deben definirse en .env (ver .env.example).
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. ' +
      'Definílas en un archivo .env en la raíz del proyecto (ver .env.example).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

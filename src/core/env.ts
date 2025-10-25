import "dotenv/config";

export const env = {
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  PORT: Number(process.env.PORT || 3000),
};

// Función para validar que las variables de entorno estén configuradas
export function validateEnv() {
  if (!env.SUPABASE_URL) {
    throw new Error("SUPABASE_URL environment variable is required");
  }

  if (!env.SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_ANON_KEY environment variable is required");
  }
}

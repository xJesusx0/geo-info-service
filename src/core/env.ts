import "dotenv/config";

export const env = {
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  PORT: Number(process.env.PORT || 3000),
};

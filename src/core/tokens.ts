export const TOKENS = {
  CITY_REPOSITORY: "CityRepository",
  SUPABASE_CLIENT: "SupabaseClient",
} as const;

export type Token = (typeof TOKENS)[keyof typeof TOKENS];

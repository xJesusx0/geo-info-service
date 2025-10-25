export const TOKENS = {
  SUPABASE_CLIENT: "SupabaseClient",
  CITY_REPOSITORY: "CityRepository",
  CITY_SERVICE: "CityService",
} as const;

export type Token = (typeof TOKENS)[keyof typeof TOKENS];

export const TOKENS = {
  SUPABASE_CLIENT: "SupabaseClient",
  CITY_REPOSITORY: "CityRepository",
  NEIGHBORHOOD_REPOSITORY: "NeighborHoodRepository",
  CITY_SERVICE: "CityService",
  NEIGHBORHOOD_SERVICE: "NeighborhoodService",
  CITY_CONTROLLER: "CityController",
  NEIGHBORHOOD_CONTROLLER: "NeighborhoodController",
} as const;

export type Token = (typeof TOKENS)[keyof typeof TOKENS];

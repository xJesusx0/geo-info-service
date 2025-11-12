export const TOKENS = {
  SUPABASE_CLIENT: 'SupabaseClient',
  CITY_REPOSITORY: 'CityRepository',
  NEIGHBORHOOD_REPOSITORY: 'NeighborHoodRepository',
  COUNTRY_REPOSITORY: 'CountryRepository',
  DEPARTMENT_REPOSITORY: 'DepartmentRepository',
  CITY_SERVICE: 'CityService',
  NEIGHBORHOOD_SERVICE: 'NeighborhoodService',
  COUNTRY_SERVICE: 'CountryService',
  DEPARTMENT_SERVICE: 'DepartmentService',
  CITY_CONTROLLER: 'CityController',
  NEIGHBORHOOD_CONTROLLER: 'NeighborhoodController',
  COUNTRY_CONTROLLER: 'CountryController',
  DEPARTMENT_CONTROLLER: 'DepartmentController',
} as const;

export type Token = (typeof TOKENS)[keyof typeof TOKENS];

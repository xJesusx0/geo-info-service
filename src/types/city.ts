import type { Database } from "./database.types";

export type City = Database["public"]["Tables"]["city"]["Row"];
export type CityInsert = Database["public"]["Tables"]["city"]["Insert"];
export type CityUpdate = Database["public"]["Tables"]["city"]["Update"];
export type CitySearchQueryParams = {
  countryId?: number;
  departmentId?: number;
  name?: string;
  daneCode?: string;
};

import { City, CitySearchQueryParams } from "../../types/city";

export interface CityRepository {
  findAll(queryParams: CitySearchQueryParams): Promise<City[]>;
  findById(id: number): Promise<City | null>;
}

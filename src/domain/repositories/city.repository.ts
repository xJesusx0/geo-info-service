import { City, CitySearchQueryParams, CityWithRelations } from '../../types/city';

export interface CityRepository {
  findAll(queryParams: CitySearchQueryParams): Promise<CityWithRelations[]>;
  findById(id: number): Promise<City | null>;
}

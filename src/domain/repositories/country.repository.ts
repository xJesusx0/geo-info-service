import { Country, CountrySearchQueryParams } from '../../types/country';

export interface CountryRepository {
  findAll(queryParams: CountrySearchQueryParams): Promise<Country[]>;
  findById(id: number): Promise<Country | null>;
}

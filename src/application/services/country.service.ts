import { CountryRepository } from '../../domain/repositories/country.repository';
import { Country, CountrySearchQueryParams } from '../../types/country';

export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  async getAllCountries(queryParams: CountrySearchQueryParams): Promise<Country[]> {
    return await this.countryRepository.findAll(queryParams);
  }

  async getCountryById(id: number): Promise<Country | null> {
    return await this.countryRepository.findById(id);
  }
}

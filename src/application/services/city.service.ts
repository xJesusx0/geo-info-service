import { CityRepository } from "../../domain/repositories/city.repository";
import { City, CitySearchQueryParams } from "../../types/city";

export class CityService {
  constructor(private cityRepository: CityRepository) {}

  async getAllCities(queryParams: CitySearchQueryParams): Promise<City[]> {
    if (!queryParams) {
      queryParams = {};
    }

    return await this.cityRepository.findAll(queryParams);
  }

  async getCityById(id: number): Promise<City | null> {
    // validación de negocio
    return await this.cityRepository.findById(id);
  }
}

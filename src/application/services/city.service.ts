import { CityRepository } from "../../domain/repositories/city.repository";
import { City } from "../../types/city";

export class CityService {
  constructor(private cityRepository: CityRepository) {}

  async getAllCities(): Promise<City[]> {
    return await this.cityRepository.findAll();
  }

  async getCityById(id: number): Promise<City | null> {
    // validación de negocio
    return await this.cityRepository.findById(id);
  }
}

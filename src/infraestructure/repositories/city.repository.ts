import { CityRepository } from "../../domain/repositories/city.repository";
import { City } from "../../types/city";

export class SupabaseCityRepository implements CityRepository {
  findAll(): Promise<City[]> {
    return Promise.resolve([]);
  }

  findById(id: number): Promise<City> {
    return Promise.reject(new Error("Method not implemented."));
  }
}

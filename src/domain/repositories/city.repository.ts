import { City } from "../../types/city";

export interface CityRepository {
  findAll(): Promise<City[]>;
  findById(id: number): Promise<City>;
}

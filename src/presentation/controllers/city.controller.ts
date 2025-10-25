import { Request, Response } from "express";
import { CityService } from "../../application/services/city.service";
import { City } from "../../types/city";

export class CityController {
  constructor(private cityService: CityService) {}

  getAll = async (req: Request, res: Response) => {
    const cities = await this.cityService.getAllCities();
    res.json(cities);
  };
}

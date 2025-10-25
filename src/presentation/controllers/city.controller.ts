import { Request, Response } from "express";
import { CityService } from "../../application/services/city.service";
import { City, CitySearchQueryParams } from "../../types/city";

export class CityController {
  constructor(private cityService: CityService) {}

  getAll = async (req: Request, res: Response) => {
    const { countryId, departmentId, name, daneCode } = req.query;

    const queryParams: CitySearchQueryParams = {
      countryId: countryId ? Number(countryId) : undefined,
      departmentId: departmentId ? Number(departmentId) : undefined,
      name: name ? String(name) : undefined,
      daneCode: daneCode ? String(daneCode) : undefined,
    };

    const cities = await this.cityService.getAllCities(queryParams);
    res.json(cities);
  };
}

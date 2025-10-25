import { Request, Response } from "express";
import { CityService } from "../../application/services/city.service";
import { City, CitySearchQueryParams } from "../../types/city";
import { ErrorResponse } from "../dtos/api.dto";

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

  getById = async (req: Request, res: Response) => {
    const cityId = Number(req.params.id);

    const city: City | null = await this.cityService.getCityById(cityId);

    if (!city) {
      const response: ErrorResponse = { message: "City not found" };
      return res.status(404).json(response);
    }

    res.json(city);
  };
}

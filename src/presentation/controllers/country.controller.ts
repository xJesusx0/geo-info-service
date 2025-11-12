import { Request, Response } from 'express';
import { CountryService } from '../../application/services/country.service';
import { Country, CountrySearchQueryParams } from '../../types/country';
import { ErrorResponse } from '../dtos/api.dto';

export class CountryController {
  constructor(private countryService: CountryService) {}

  getAll = async (req: Request, res: Response) => {
    const { name, isoAlpha2Code, isoAlpha3Code, isoNumericCode } = req.query;

    const queryParams: CountrySearchQueryParams = {
      name: name ? String(name) : undefined,
      isoAlpha2Code: isoAlpha2Code ? String(isoAlpha2Code) : undefined,
      isoAlpha3Code: isoAlpha3Code ? String(isoAlpha3Code) : undefined,
      isoNumericCode: isoNumericCode ? String(isoNumericCode) : undefined,
    };

    const countries = await this.countryService.getAllCountries(queryParams);
    res.json(countries);
  };

  getById = async (req: Request, res: Response) => {
    const countryId = Number(req.params.id);

    const country: Country | null = await this.countryService.getCountryById(countryId);

    if (!country) {
      const response: ErrorResponse = { message: 'Country not found' };
      return res.status(404).json(response);
    }

    res.json(country);
  };
}

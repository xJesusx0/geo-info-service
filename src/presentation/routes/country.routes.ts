import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';

export function createCountryRoutes(): Router {
  const router = Router();
  const countryController = container.resolve<CountryController>(TOKENS.COUNTRY_CONTROLLER);

  router.get('/', countryController.getAll);
  router.get('/:id', countryController.getById);
  return router;
}

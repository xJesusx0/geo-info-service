import { Router } from 'express';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';
import { NeighborhoodController } from '../controllers/neighborhood.controller';

export function createNeighborhoodRoutes(): Router {
  const router = Router();
  const neighborhoodController = container.resolve<NeighborhoodController>(
    TOKENS.NEIGHBORHOOD_CONTROLLER
  );

  router.get('/point', neighborhoodController.getByPoint);
  return router;
}

import { Router } from "express";
import { CityController } from "../controllers/city.controller";
import { container } from "../../core/container";
import { TOKENS } from "../../core/tokens";

export function createCityRoutes(): Router {
  const router = Router();
  const cityController = container.resolve<CityController>(
    TOKENS.CITY_CONTROLLER
  );

  router.get("/", cityController.getAll);
  router.get("/:id", cityController.getById);
  return router;
}

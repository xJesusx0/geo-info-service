import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { container } from "../core/container";
import { Token, TOKENS } from "../core/tokens";
import { Database } from "../types/database.types";
import { env, validateEnv } from "../core/env";
import { SupabaseCityRepository } from "../infraestructure/repositories/city.repository";
import { CityService } from "./services/city.service";
import { CityRepository } from "../domain/repositories/city.repository";
import "dotenv/config";
import { CityController } from "../presentation/controllers/city.controller";
import { SupabaseNeighborhoodRepository } from "../infraestructure/repositories/neighborhood.repository";
import { NeighborhoodService } from "./services/neighborhood.service";
import { NeighborhoodRepository } from "../domain/repositories/neighborhood.repository";
import { NeighborhoodController } from "../presentation/controllers/neighborhood.controller";

export function configureContainer() {
  validateEnv();

  const supabaseClient = createClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY
  );
  container.registerInstance(TOKENS.SUPABASE_CLIENT, supabaseClient);

  // Registrar repositorios
  registerSupabaseRepository(TOKENS.CITY_REPOSITORY, SupabaseCityRepository);

  registerSupabaseRepository(
    TOKENS.NEIGHBORHOOD_REPOSITORY,
    SupabaseNeighborhoodRepository
  );

  // Registrar servicios
  registerService<CityService, CityRepository>(
    TOKENS.CITY_SERVICE,
    TOKENS.CITY_REPOSITORY,
    CityService
  );

  registerService<NeighborhoodService, NeighborhoodRepository>(
    TOKENS.NEIGHBORHOOD_SERVICE,
    TOKENS.NEIGHBORHOOD_REPOSITORY,
    NeighborhoodService
  );

  // Registrar controladores
  registerController(
    TOKENS.CITY_CONTROLLER,
    TOKENS.CITY_SERVICE,
    CityController
  );

  registerController(
    TOKENS.NEIGHBORHOOD_CONTROLLER,
    TOKENS.NEIGHBORHOOD_SERVICE,
    NeighborhoodController
  );
}
/**
 * Registra un repositorio que depende de Supabase
 */
export function registerSupabaseRepository<T>(
  token: Token,
  RepositoryClass: new (supabase: SupabaseClient<Database>) => T
) {
  container.registerFactory(
    token,
    () => {
      const supabase = container.resolve<SupabaseClient<Database>>(
        TOKENS.SUPABASE_CLIENT
      );
      return new RepositoryClass(supabase);
    },
    { singleton: true }
  );
}

/**
 * Registra un servicio que depende de un repositorio
 */
export function registerService<TService, TRepository>(
  serviceToken: Token,
  repositoryToken: Token,
  ServiceClass: new (repository: TRepository) => TService
) {
  container.registerFactory(
    serviceToken,
    () => {
      const repository = container.resolve<TRepository>(repositoryToken);
      return new ServiceClass(repository);
    },
    { singleton: true }
  );
}

/**
 * Registra un controlador que depende de un servicio
 */
export function registerController<TController, TService>(
  controllerToken: Token,
  serviceToken: Token,
  ControllerClass: new (service: TService) => TController
) {
  container.registerFactory(
    controllerToken,
    () => {
      const service = container.resolve<TService>(serviceToken);
      return new ControllerClass(service);
    },
    { singleton: true }
  );
}

/**
 * Versión genérica para cualquier dependencia única
 */
export function registerWithSingleDependency<TClass, TDependency>(
  classToken: Token,
  dependencyToken: Token,
  ClassConstructor: new (dependency: TDependency) => TClass
) {
  container.registerFactory(
    classToken,
    () => {
      const dependency = container.resolve<TDependency>(dependencyToken);
      return new ClassConstructor(dependency);
    },
    { singleton: true }
  );
}

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { container } from "../core/container";
import { TOKENS } from "../core/tokens";
import { Database } from "../types/database.types";
import { env, validateEnv } from "../core/env";
import { SupabaseCityRepository } from "../infraestructure/repositories/city.repository";
import { CityService } from "./services/city.service";
import { CityRepository } from "../domain/repositories/city.repository";
import "dotenv/config";

export function configureContainer() {
  validateEnv();

  const supabaseClient = createClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY
  );

  container.registerInstance(TOKENS.SUPABASE_CLIENT, supabaseClient);

  container.registerFactory(
    TOKENS.CITY_REPOSITORY,
    () => {
      const supabase: SupabaseClient<Database> = container.resolve(
        TOKENS.SUPABASE_CLIENT
      );
      return new SupabaseCityRepository(supabase);
    },
    { singleton: true }
  );

  container.registerFactory(
    TOKENS.CITY_SERVICE,
    () => {
      const cityRepository: CityRepository = container.resolve(
        TOKENS.CITY_REPOSITORY
      );
      return new CityService(cityRepository);
    },
    { singleton: true }
  );
}

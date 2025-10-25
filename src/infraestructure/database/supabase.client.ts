import { createClient } from "@supabase/supabase-js";
import { env } from "../../core/env";
import { Database } from "../../types/database.types";

export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);

import { SupabaseClient } from "@supabase/supabase-js";
import { CityRepository } from "../../domain/repositories/city.repository";
import { City } from "../../types/city";
import { Database } from "../../types/database.types";

export class SupabaseCityRepository implements CityRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findAll(): Promise<City[]> {
    const { data, error } = await this.supabaseClient.from("city").select("*");
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data;
  }

  async findById(id: number): Promise<City | null> {
    const { data, error } = await this.supabaseClient
      .from("city")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data;
  }
}

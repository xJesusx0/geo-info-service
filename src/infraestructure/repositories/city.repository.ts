import { SupabaseClient } from "@supabase/supabase-js";
import { CityRepository } from "../../domain/repositories/city.repository";
import { City, CitySearchQueryParams } from "../../types/city";
import { Database } from "../../types/database.types";

export class SupabaseCityRepository implements CityRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findAll(queryParams: CitySearchQueryParams): Promise<City[]> {
    const query = this.supabaseClient.from("city").select("*");

    if (queryParams.countryId) {
      query.eq("country_id", queryParams.countryId);
    }

    if (queryParams.departmentId) {
      query.eq("department_id", queryParams.departmentId);
    }

    if (queryParams.name) {
      query.ilike("name", `%${queryParams.name}%`);
    }

    if (queryParams.daneCode) {
      query.eq("dane_code", queryParams.daneCode);
    }

    const { data, error } = await query;
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

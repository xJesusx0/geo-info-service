import { SupabaseClient } from "@supabase/supabase-js";
import { CityRepository } from "../../domain/repositories/city.repository";
import {
  City,
  CitySearchQueryParams,
  CityWithRelations,
} from "../../types/city";
import { Database } from "../../types/database.types";

export class SupabaseCityRepository implements CityRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findAll(
    queryParams: CitySearchQueryParams
  ): Promise<CityWithRelations[]> {
    let query = this.supabaseClient.from("v_city_with_relations").select("*");

    if (queryParams.countryId) {
      query = query.eq("country_id", queryParams.countryId);
    }

    if (queryParams.departmentId) {
      query = query.eq("department_id", queryParams.departmentId);
    }

    if (queryParams.name) {
      query = query.ilike("name", `%${queryParams.name}%`);
    }

    if (queryParams.daneCode) {
      query = query.eq("dane_code", queryParams.daneCode);
    }

    // Ahora SÍ funcionan porque son columnas directas de la vista
    if (queryParams.countryName) {
      query = query.ilike("country_name_es", `%${queryParams.countryName}%`);
    }

    if (queryParams.departmentName) {
      query = query.ilike("department_name", `%${queryParams.departmentName}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data || [];
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

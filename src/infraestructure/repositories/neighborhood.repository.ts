import { SupabaseClient } from "@supabase/supabase-js";
import { NeighborhoodRepository } from "../../domain/repositories/neighborhood.repository";
import { NeighborhoodByPoint } from "../../types/neighborhood";
import { Database } from "../../types/database.types";

export class SupabaseNeighborhoodRepository implements NeighborhoodRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findByCoordinates(
    longitude: number,
    latitude: number
  ): Promise<NeighborhoodByPoint | null> {
    const { data, error } = await this.supabaseClient
      .rpc("get_neighborhood_by_point", {
        lon: longitude,
        lat: latitude,
      })
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // No encontrado
      throw new Error(`Geo query failed: ${error.message}`);
    }

    return data;
  }
}

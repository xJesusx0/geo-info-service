import { SupabaseClient } from '@supabase/supabase-js';
import { DepartmentRepository } from '../../domain/repositories/department.repository';
import { Department, DepartmentSearchQueryParams } from '../../types/department';
import { Database } from '../../types/database.types';

export class SupabaseDepartmentRepository implements DepartmentRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findAll(queryParams: DepartmentSearchQueryParams): Promise<Department[]> {
    let query = this.supabaseClient.from('department').select('*');

    if (queryParams.name) {
      query = query.ilike('name', `%${queryParams.name}%`);
    }

    if (queryParams.daneCode) {
      query = query.eq('dane_code', queryParams.daneCode);
    }

    if (queryParams.countryId) {
      query = query.eq('country_id', queryParams.countryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async findById(id: number): Promise<Department | null> {
    const { data, error } = await this.supabaseClient
      .from('department')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error(error);
      throw new Error(error.message);
    }

    return data;
  }
}

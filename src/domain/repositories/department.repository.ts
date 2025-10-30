import { Department, DepartmentSearchQueryParams } from '../../types/department';

export interface DepartmentRepository {
  findAll(queryParams: DepartmentSearchQueryParams): Promise<Department[]>;
  findById(id: number): Promise<Department | null>;
}

import { DepartmentRepository } from '../../domain/repositories/department.repository';
import { Department, DepartmentSearchQueryParams } from '../../types/department';

export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  async getAllDepartments(queryParams: DepartmentSearchQueryParams): Promise<Department[]> {
    return await this.departmentRepository.findAll(queryParams);
  }

  async getDepartmentById(id: number): Promise<Department | null> {
    return await this.departmentRepository.findById(id);
  }
}

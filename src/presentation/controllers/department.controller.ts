import { Request, Response } from 'express';
import { DepartmentService } from '../../application/services/department.service';
import { Department, DepartmentSearchQueryParams } from '../../types/department';
import { ErrorResponse } from '../dtos/api.dto';

export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  getAll = async (req: Request, res: Response) => {
    const { name, daneCode, countryId } = req.query;

    const queryParams: DepartmentSearchQueryParams = {
      name: name ? String(name) : undefined,
      daneCode: daneCode ? String(daneCode) : undefined,
      countryId: countryId ? Number(countryId) : undefined,
    };

    const departments = await this.departmentService.getAllDepartments(queryParams);
    res.json(departments);
  };

  getById = async (req: Request, res: Response) => {
    const departmentId = Number(req.params.id);

    const department: Department | null = await this.departmentService.getDepartmentById(
      departmentId
    );

    if (!department) {
      const response: ErrorResponse = { message: 'Department not found' };
      return res.status(404).json(response);
    }

    res.json(department);
  };
}

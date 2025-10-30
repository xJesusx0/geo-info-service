import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';

export function createDepartmentRoutes(): Router {
  const router = Router();
  const departmentController = container.resolve<DepartmentController>(
    TOKENS.DEPARTMENT_CONTROLLER
  );

  router.get('/', departmentController.getAll);
  router.get('/:id', departmentController.getById);
  return router;
}

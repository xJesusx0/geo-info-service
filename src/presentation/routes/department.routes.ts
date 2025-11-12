import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';

export function createDepartmentRoutes(): Router {
  const router = Router();
  const departmentController = container.resolve<DepartmentController>(
    TOKENS.DEPARTMENT_CONTROLLER
  );

  /**
   * @swagger
   * /api/v1/departments:
   *   get:
   *     summary: Obtener todos los departamentos
   *     description: Recupera una lista de departamentos con la posibilidad de aplicar filtros
   *     tags: [Departments]
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Filtra los departamentos por nombre (búsqueda parcial)
   *         example: "Atlántico"
   *       - in: query
   *         name: daneCode
   *         schema:
   *           type: string
   *         description: Filtra los departamentos por código DANE exacto
   *         example: "08"
   *       - in: query
   *         name: countryId
   *         schema:
   *           type: integer
   *         description: Filtra los departamentos por ID de país
   *         example: 48
   *     responses:
   *       200:
   *         description: Lista de departamentos encontrados
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Department'
   *             example:
   *               - id: 5
   *                 name: "Atlántico"
   *                 dane_code: "08"
   *                 country_id: 48
   *                 active: true
   *                 created_at: "2025-10-24T13:50:50.892312+00:00"
   *                 updated_at: "2025-10-24T13:50:50.892312+00:00"
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/', departmentController.getAll);

  /**
   * @swagger
   * /api/v1/departments/{id}:
   *   get:
   *     summary: Obtener un departamento por ID
   *     description: Recupera la información de un departamento específico por su ID
   *     tags: [Departments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del departamento
   *         example: 5
   *     responses:
   *       200:
   *         description: Información del departamento
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Department'
   *             example:
   *               id: 5
   *               name: "Atlántico"
   *               dane_code: "08"
   *               country_id: 48
   *               active: true
   *               created_at: "2025-10-24T13:50:50.892312+00:00"
   *               updated_at: "2025-10-24T13:50:50.892312+00:00"
   *       404:
   *         description: Departamento no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *             example:
   *               message: "Department not found"
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/:id', departmentController.getById);
  return router;
}

import { Router } from 'express';
import { CityController } from '../controllers/city.controller';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';

export function createCityRoutes(): Router {
  const router = Router();
  const cityController = container.resolve<CityController>(TOKENS.CITY_CONTROLLER);

  /**
   * @swagger
   * /api/v1/cities:
   *   get:
   *     summary: Obtener todas las ciudades
   *     description: Recupera una lista de ciudades con la posibilidad de aplicar filtros
   *     tags: [Cities]
   *     parameters:
   *       - in: query
   *         name: countryId
   *         schema:
   *           type: integer
   *         description: Filtra las ciudades por ID de país. Si se usa, se ignora countryName
   *         example: 48
   *       - in: query
   *         name: departmentId
   *         schema:
   *           type: integer
   *         description: Filtra las ciudades por ID de departamento. Si se usa, se ignora departmentName
   *         example: 5
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Filtra las ciudades por nombre (búsqueda parcial, case-insensitive)
   *         example: "SANTO"
   *       - in: query
   *         name: daneCode
   *         schema:
   *           type: string
   *         description: Filtra las ciudades por código DANE exacto
   *         example: "685"
   *       - in: query
   *         name: countryName
   *         schema:
   *           type: string
   *         description: Filtra las ciudades por nombre del país (búsqueda parcial). Solo se aplica si no se envía countryId
   *         example: "Colombia"
   *       - in: query
   *         name: departmentName
   *         schema:
   *           type: string
   *         description: Filtra las ciudades por nombre del departamento (búsqueda parcial). Solo se aplica si no se envía departmentId
   *         example: "Atlántico"
   *     responses:
   *       200:
   *         description: Lista de ciudades encontradas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CityWithRelations'
   *             example:
   *               - id: 898
   *                 name: "SANTO TOMAS"
   *                 dane_code: "685"
   *                 department_id: 5
   *                 country_id: 48
   *                 active: true
   *                 created_at: "2025-10-24T13:50:50.892312+00:00"
   *                 updated_at: "2025-10-24T13:50:50.892312+00:00"
   *                 country_name_es: "Colombia"
   *                 department_name: "Atlántico"
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/', cityController.getAll);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *   get:
   *     summary: Obtener una ciudad por ID
   *     description: Recupera la información de una ciudad específica por su ID
   *     tags: [Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la ciudad
   *         example: 898
   *     responses:
   *       200:
   *         description: Información de la ciudad
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   *             example:
   *               id: 898
   *               name: "SANTO TOMAS"
   *               dane_code: "685"
   *               department_id: 5
   *               country_id: 48
   *               active: true
   *               created_at: "2025-10-24T13:50:50.892312+00:00"
   *               updated_at: "2025-10-24T13:50:50.892312+00:00"
   *       404:
   *         description: Ciudad no encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *             example:
   *               message: "City not found"
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/:id', cityController.getById);
  return router;
}

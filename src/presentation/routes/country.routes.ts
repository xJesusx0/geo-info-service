import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';

export function createCountryRoutes(): Router {
  const router = Router();
  const countryController = container.resolve<CountryController>(TOKENS.COUNTRY_CONTROLLER);

  /**
   * @swagger
   * /api/v1/countries:
   *   get:
   *     summary: Obtener todos los países
   *     description: Recupera una lista de países con la posibilidad de aplicar filtros
   *     tags: [Countries]
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Filtra los países por nombre (búsqueda parcial)
   *         example: "Colombia"
   *       - in: query
   *         name: isoAlpha2Code
   *         schema:
   *           type: string
   *         description: Filtra los países por código ISO Alpha-2
   *         example: "CO"
   *       - in: query
   *         name: isoAlpha3Code
   *         schema:
   *           type: string
   *         description: Filtra los países por código ISO Alpha-3
   *         example: "COL"
   *       - in: query
   *         name: isoNumericCode
   *         schema:
   *           type: string
   *         description: Filtra los países por código ISO numérico
   *         example: "170"
   *     responses:
   *       200:
   *         description: Lista de países encontrados
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Country'
   *             example:
   *               - id: 48
   *                 name_es: "Colombia"
   *                 name_en: "Colombia"
   *                 iso_alpha2_code: "CO"
   *                 iso_alpha3_code: "COL"
   *                 iso_numeric_code: "170"
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
  router.get('/', countryController.getAll);

  /**
   * @swagger
   * /api/v1/countries/{id}:
   *   get:
   *     summary: Obtener un país por ID
   *     description: Recupera la información de un país específico por su ID
   *     tags: [Countries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del país
   *         example: 48
   *     responses:
   *       200:
   *         description: Información del país
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Country'
   *             example:
   *               id: 48
   *               name_es: "Colombia"
   *               name_en: "Colombia"
   *               iso_alpha2_code: "CO"
   *               iso_alpha3_code: "COL"
   *               iso_numeric_code: "170"
   *               active: true
   *               created_at: "2025-10-24T13:50:50.892312+00:00"
   *               updated_at: "2025-10-24T13:50:50.892312+00:00"
   *       404:
   *         description: País no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *             example:
   *               message: "Country not found"
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/:id', countryController.getById);
  return router;
}

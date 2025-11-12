import { Router } from 'express';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';
import { NeighborhoodController } from '../controllers/neighborhood.controller';

export function createNeighborhoodRoutes(): Router {
  const router = Router();
  const neighborhoodController = container.resolve<NeighborhoodController>(
    TOKENS.NEIGHBORHOOD_CONTROLLER
  );

  /**
   * @swagger
   * /api/v1/neighborhoods/point:
   *   get:
   *     summary: Obtener barrio por coordenadas geográficas
   *     description: Busca el barrio que contiene un punto geográfico específico basado en coordenadas de longitud y latitud
   *     tags: [Neighborhoods]
   *     parameters:
   *       - in: query
   *         name: longitude
   *         required: true
   *         schema:
   *           type: number
   *           format: double
   *         description: Longitud del punto geográfico (coordenada X)
   *         example: -74.0833
   *       - in: query
   *         name: latitude
   *         required: true
   *         schema:
   *           type: number
   *           format: double
   *         description: Latitud del punto geográfico (coordenada Y)
   *         example: 4.6097
   *     responses:
   *       200:
   *         description: Información del barrio encontrado en las coordenadas especificadas
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 neighborhood_id:
   *                   type: integer
   *                   description: ID del barrio
   *                 neighborhood_name:
   *                   type: string
   *                   description: Nombre del barrio
   *                 city_id:
   *                   type: integer
   *                   description: ID de la ciudad
   *                 city_name:
   *                   type: string
   *                   description: Nombre de la ciudad
   *                 department_id:
   *                   type: integer
   *                   description: ID del departamento
   *                 department_name:
   *                   type: string
   *                   description: Nombre del departamento
   *                 country_id:
   *                   type: integer
   *                   description: ID del país
   *                 country_name:
   *                   type: string
   *                   description: Nombre del país
   *                 context:
   *                   type: object
   *                   properties:
   *                     longitude:
   *                       type: number
   *                     latitude:
   *                       type: number
   *             example:
   *               neighborhood_id: 123
   *               neighborhood_name: "Centro"
   *               city_id: 898
   *               city_name: "Bogotá"
   *               department_id: 5
   *               department_name: "Cundinamarca"
   *               country_id: 48
   *               country_name: "Colombia"
   *               context:
   *                 longitude: -74.0833
   *                 latitude: 4.6097
   *       400:
   *         description: Parámetros inválidos o faltantes
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *             example:
   *               message: "Invalid request params, missing longitude or latitude"
   *       404:
   *         description: No se encontró ubicación para las coordenadas especificadas
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "No se encontro la locacion solicitada"
   *                 context:
   *                   type: object
   *                   properties:
   *                     longitude:
   *                       type: number
   *                     latitude:
   *                       type: number
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/point', neighborhoodController.getByPoint);
  return router;
}

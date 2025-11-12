import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { env } from './core/env';
import { configureContainer } from './application/container.config';

configureContainer();

import { createCityRoutes } from './presentation/routes/city.routes';
import { createNeighborhoodRoutes } from './presentation/routes/neighborhood.routes';
import { createCountryRoutes } from './presentation/routes/country.routes';
import { createDepartmentRoutes } from './presentation/routes/department.routes';
import { swaggerSpec } from './presentation/swagger.config';

const app = express();
const port = env.PORT;

/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint de salud del servicio
 *     description: Verifica que el servicio esté funcionando correctamente
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello"
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
app.get('/', async (req, res) => {
  res.json({
    message: 'Hello',
    status: 'ok',
  });
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/cities', createCityRoutes());
app.use('/api/v1/neighborhoods', createNeighborhoodRoutes());
app.use('/api/v1/countries', createCountryRoutes());
app.use('/api/v1/departments', createDepartmentRoutes());

app.listen(port, () => {
  console.warn(`Server is running on port ${port}`);
  console.warn(`Swagger documentation available at http://localhost:${port}/api-docs`);
});

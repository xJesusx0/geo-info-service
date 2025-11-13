import express from 'express';
import { env } from './core/env';
import { configureContainer } from './application/container.config';
import cors from 'cors';
configureContainer();

import { createCityRoutes } from './presentation/routes/city.routes';
import { createNeighborhoodRoutes } from './presentation/routes/neighborhood.routes';
import { createCountryRoutes } from './presentation/routes/country.routes';
import { createDepartmentRoutes } from './presentation/routes/department.routes';
import { swaggerSpec } from './presentation/swagger.config';

const app = express();
const port = env.PORT;

app.use(cors({
  origin: ["*"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

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
 */
app.get('/', async (req, res) => {
  res.json({
    message: 'Hello',
    status: 'ok',
  });
});

// Endpoint para servir la especificación OpenAPI
app.get('/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api-docs', (req, res) => {

  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.get('host');
  const baseUrl = `${protocol}://${host}`;
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Geo Info Service API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css">
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "${baseUrl}/openapi.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
      window.ui = ui;
    };
  </script>
</body>
</html>
  `;
  res.send(html);
});

// Rutas de la API
app.use('/api/v1/cities', createCityRoutes());
app.use('/api/v1/neighborhoods', createNeighborhoodRoutes());
app.use('/api/v1/countries', createCountryRoutes());
app.use('/api/v1/departments', createDepartmentRoutes());

// Solo iniciar el servidor si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.warn(`Server is running on port ${port}`);
    console.warn(`Swagger documentation available at http://localhost:${port}/api-docs`);
  });
}

// Exportar para Vercel
export default app;
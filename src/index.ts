import express from 'express';
import { env } from './core/env';
import { configureContainer } from './application/container.config';

configureContainer();

import { createCityRoutes } from './presentation/routes/city.routes';
import { createNeighborhoodRoutes } from './presentation/routes/neighborhood.routes';
import { createCountryRoutes } from './presentation/routes/country.routes';
import { createDepartmentRoutes } from './presentation/routes/department.routes';

const app = express();
const port = env.PORT;

app.get('/', async (req, res) => {
  res.json({
    message: 'Hello',
    status: 'ok',
  });
});

app.use('/api/v1/cities', createCityRoutes());
app.use('/api/v1/neighborhoods', createNeighborhoodRoutes());
app.use('/api/v1/countries', createCountryRoutes());
app.use('/api/v1/departments', createDepartmentRoutes());

app.listen(port, () => {
  console.warn(`Server is running on port ${port}`);
});

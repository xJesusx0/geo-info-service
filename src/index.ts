import express from "express";
import { env } from "./core/env";
import { configureContainer } from "./application/container.config";

configureContainer();

import { createCityRoutes } from "./presentation/routes/city.routes";
import { createNeighborhoodRoutes } from "./presentation/routes/neighborhood.routes";

const app = express();
const port = env.PORT;

app.get("/", async (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api/v1/cities", createCityRoutes());
app.use("/api/v1/neighborhoods", createNeighborhoodRoutes());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

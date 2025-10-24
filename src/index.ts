import express from "express";
import { env } from "./core/env";

const app = express();
const port = env.PORT;

interface TestResponse {
  message: string;
}

app.get("/", (req, res) => {
  res.json({
    message: "Hola mundo",
  } as TestResponse);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

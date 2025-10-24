import express from "express";

const app = express();
const port = 3000;

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

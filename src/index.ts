import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

process.on("SIGTERM", () => {
  process.exit();
});

app.listen(process.env.PORT, () =>
  console.log(`Server started at ${process.env.PORT}`)
);

export { app };

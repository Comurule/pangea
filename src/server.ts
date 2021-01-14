import express, { Request, Response } from "express";
import logger from "./utils/logger";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import * as dotenv from "dotenv";
import { subscribeRoutes, publishRoutes } from "./routes/v1/";
import { router as healthRouter } from "./routes/health";
import swaggerDocument from './swagger.json';

dotenv.config();

["REDIS_HOST"].forEach(name => {
  if (!process.env[name]) {
    logger.error(`Environment variable ${name} is missing`);
    process.exit(0);
  }
});

const app = express();
app.get("/status", (_req: Request, res: Response) =>
  res.status(200).json({ message: "Success" })
);
app.enable("trust proxy");

// Log requests to the console.
const loggerFormat = '- [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat));

// Parse incoming requests data
app.use(express.json());

// Define Route
const VERSION = "v1";
app.use(`${VERSION}/api-doc`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/${VERSION}/subscribe`, subscribeRoutes);
app.use(`/${VERSION}/publish`, publishRoutes);
// health check
app.use(healthRouter);

// error handlers
app.use("*", (_req: Request, res: Response) =>
  res.status(404).json({
    message: "Well, will you help build this route? 🤷🏼‍♂️"
  })
);

const hostname = process.env.hostname || "127.0.0.1";
const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  logger.info(`API is listening on ${hostname}:${port}`);
});

process.on("SIGINT", () => {
  server.close();
  logger.info("Successfully shuts down server");
  process.exit(0);
});

export default app;

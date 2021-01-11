import express, { Request, Response} from 'express';
// import * as cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import {  subscribeRoutes, publishRoutes } from './routes/v1/';
import { router as healthRouter } from './routes/health';

dotenv.config;

const app = express();

app.get('/status', (_req: Request, res: Response) => res.status(200)
  .json({ message: 'Welcome to search api' }));
app.enable('trust proxy');

// Log requests to the console.
const loggerFormat = '- [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat));

// Parse incoming requests data
app.use(express.json());

// Define Route
const VERSION = 'v3';

app.use(`/${VERSION}/subscribe`, subscribeRoutes);
app.use(`/${VERSION}/publish`, publishRoutes);
// health check
app.use(healthRouter);

// error handlers
app.use('*', (_req: Request, res: Response) => res.status(404).json({
  message: 'Well, will you help build this route? 🤷🏼‍♂️',
}));

const hostname = process.env.hostname || '127.0.0.1';
const port = process.env.PORT || 9000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API is listening on ${hostname}:${port}`);
});

export default app;

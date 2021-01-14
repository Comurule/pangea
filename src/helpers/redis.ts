import redis from "redis";
import { promisifyAll } from "bluebird";
import logger from "../utils/logger";

const Redis: any = promisifyAll(redis);

const redisClient: any = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  no_ready_check: true,
});

process.on("SIGINT", () => redisClient.quit());

redisClient.once("connect", () => logger.info("Redis connected!"));
redisClient.on("error", (err: any) =>
  logger.error(`Redis connection error: ${err}`)
);
redisClient.on("reconnecting", () => logger.warn("Redis reconnecting"));
redisClient.on("end", () => logger.warn("Redis closed!"));

export default redisClient;

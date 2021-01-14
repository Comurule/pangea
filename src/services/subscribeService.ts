import redisClient from "../helpers/redis";
import { SubScriberParams } from "../types";
import { getKey } from "../utils/getKey";

async function subscriberService(params: SubScriberParams): Promise<void> {
  try {
    const { topic, url } = params;
    const redisKey = getKey(topic);
    await redisClient.saddAsync(redisKey, url);
  } catch (error) {
    throw new Error("Subscribtipn failed");
  }
}

export default subscriberService;

import redisClient from "../helpers/redis";
import { PublisherParams } from "../types";
import { getKey } from "../utils/getKey";
import { sendMessageToSubscriber } from "../gateways";

async function publishToSubscribers(params: PublisherParams): Promise<void> {
  try {
    const { topic, message } = params;
    const key = getKey(topic);
    const subscribers = await redisClient.smembersAsync(key);

    await Promise.all(
      subscribers.map((url: string) =>
        sendMessageToSubscriber({ url, message })
      )
    );
  } catch (error) {
    throw new Error("Publishing was unsuccessful");
  }
}

export default publishToSubscribers;

import axios from "axios";
import logger from "../utils/logger";

interface MessageToSubscriberParams {
  url: string;
  message: {
    [key: string]: any;
  };
}

export async function sendMessageToSubscriber(
  params: MessageToSubscriberParams
): Promise<void> {
  const { url, message } = params;
  try {
    await axios({
      method: "POST",
      url,
      data: message
    });
  } catch (err) {
    logger.warn(`Request to "${url}" failed! Reason: ${err.message}`);
  }
}

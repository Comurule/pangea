import { Request, Response } from "express";
import publishToSubscribers from "../services/publishService";
import { PublisherParams } from "../types";

async function publisher(req: Request, res: Response) {
  try {
    const { topic } = req.params;
    const { message } = req.body;

    const publisherParams: PublisherParams = {
      topic,
      message
    };

    await publishToSubscribers(publisherParams);
    return res.status(200).json({
      success: true,
      message: "Successfully subscribes to topic",
      topic,
      data: message
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export default publisher;

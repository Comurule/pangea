import { Request, Response } from "express";
import subscribeService from "../services/subscribeService";

async function subscriber(req: Request, res: Response) {
  try {
    const { topic } = req.params;
    const { url } = req.body;

    await subscribeService({ topic, url });
    return res.status(201).json({
      success: true,
      message: "Successfully subscribes to topic",
      data: {
        topic,
        url
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export default subscriber;

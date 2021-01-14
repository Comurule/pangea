import { Request, Response, NextFunction } from "express";
import joi from "joi";

export function urlValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const { url } = req.body;
    const urlData = new URL(url);
    
    if(urlData.origin === url || urlData.href === url || urlData.hostname === url ||  urlData.host === url){
      return next();
    }
    
    throw new Error("invalid url format");

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function publishRequestValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await joi
      .object()
      .keys({})
      .required()
      .unknown(true)
      .validateAsync(req.body);

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

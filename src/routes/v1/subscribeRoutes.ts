import { Router } from "express";
import { urlValidator } from "../../middlewares/requestValidators";
import subscribeController from "../../controllers/subscribeController";

const router = Router();

router.post("/:topic", urlValidator, subscribeController);
export default router;

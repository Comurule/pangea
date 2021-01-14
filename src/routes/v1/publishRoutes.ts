import { Router } from "express";
import { publishRequestValidator } from "../../middlewares/requestValidators";
import publishController from "../../controllers/publishController";

const router = Router();

router.post("/:topic", publishRequestValidator, publishController);

export default router;

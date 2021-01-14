import * as express from "express";

const router = express.Router();

/**
 * health check should check the health of the current service
 * and it should NOT check the health of external dependencies (which implies no database/Redis checks)
 */
router.route("/health").get((_req: express.Request, res: express.Response) => {
  res.status(200).json({
    status: "OK"
  });
});

export { router };

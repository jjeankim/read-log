import express from "express";
import authenticate from "../middleware/auth.js";
import {
  createLog,
  deleteLog,
  getLog,
  getLogs,
  getMyLogs,
  getRecommendedLogs,
  updateLog,
} from "../controllers/logController.js";

const logRouter = express.Router();

logRouter.route("/").post(authenticate, createLog).get(getLogs);

logRouter
  .route("/:logId")
  .get(getLog)
  .put(authenticate, updateLog)
  .delete(authenticate, deleteLog)

logRouter.get("/my-logs", authenticate, getMyLogs);

logRouter.get("/recommended", authenticate,getRecommendedLogs)

export default logRouter;

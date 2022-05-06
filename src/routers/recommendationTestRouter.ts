import { Router } from "express";
import { recommendationController } from "../controllers/recommendationController.js";

const recommendationTestRouter = Router();

recommendationTestRouter.post("/tests", recommendationController.resetDatabase);

export default recommendationTestRouter;
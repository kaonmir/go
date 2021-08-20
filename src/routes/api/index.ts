import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import auth from "./auth";
import go from "./go";

const router = Router();

router.use("/auth", auth);
router.use(authMiddleware);
router.use("/go", go);

export default router;

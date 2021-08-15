import { Router } from "express";

import api from "./api";
import go from "./go";

const router = Router();

router.get("/", (req, res) => {
  res.send("test");
});

router.use("/api", api);
router.use("/go", go);

export default router;

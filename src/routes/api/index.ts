import { Router } from "express";

import go from "./go";

const router = Router();

router.get("/", (req, res) => {
  res.send("test");
});

router.use("/go", go);

export default router;

import { Router } from "express";

import api from "./api";

const router = Router();

router.get("/", (req, res) => {
  res.send("test");
});

router.use("/api", api);

export default router;

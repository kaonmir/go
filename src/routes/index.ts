import { Router } from "express";

import api from "./api";

const router = Router();

/**
 * @swagger
 *  /:
 *   get:
 *     summary: test
 *     responses:
 *       200:
 *         description: test
 */
router.get("/", (req, res) => {
  res.send("test");
});

router.use("/api", api);

export default router;

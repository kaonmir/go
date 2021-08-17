import express, { Router } from "express";
import { register } from "./controller";

const router = Router();

interface IRegisterBody {
  username: string;
  password: string;
}

export async function registerAPI(
  req: express.Request<{}, {}, IRegisterBody>,
  res: express.Response
) {
  const { username, password } = req.body;

  register(username, password)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
}

/* ------------------------------------------ */
/* /api/auth */

router.post("/register", registerAPI);

export default router;

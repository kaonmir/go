import express, { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { register, login, check } from "./auth.controller";

const router = Router();

interface IUserBody {
  username: string;
  password: string;
}

async function registerAPI(
  req: express.Request<{}, {}, IUserBody>,
  res: express.Response
) {
  const { username, password } = req.body;
  if (username && password) {
    register(username, password)
      .then((result) => res.json(result))
      .catch((err) => res.status(409).send(err));
  } else res.status(404).send("Input error");
}

async function loginAPI(
  req: express.Request<{}, {}, IUserBody>,
  res: express.Response
) {
  console.log("loginAPI");

  const { username, password } = req.body;
  if (username && password) {
    const secret = req.app.get("jwt-secret");
    login(username, password, secret)
      .then((result) => res.json(result))
      .catch((err) => res.status(409).send(err));
  } else res.status(404).send("Input error");
}

async function checkAPI(
  req: express.Request<{}, {}, {}, { token: string }>,
  res: express.Response
) {
  const token: string =
    (req.headers["x-access-token"] as string) || req.query.token;
  const secret = req.app.get("jwt-secret");

  if (token) {
    check(token, secret)
      .then((result) => res.json(result))
      .catch((err) => res.status(409).send(err));
  } else res.status(403).send("not logged in");
}

/* ------------------------------------------ */
/* /api/auth */

router.post("/register", registerAPI);
router.post("/login", loginAPI);
router.post("/check", checkAPI);

router.use("/*", () => {});

export default router;

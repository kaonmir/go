import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { IUserType } from "../../../database/user/types";
import {
  getAllGame,
  getGame,
  createGame,
  checkAuth,
  deleteGame,
} from "./go.controller";

const router = Router();

async function getAllGameAPI(req: any, res: express.Response) {
  getAllGame(req.user.username!)
    .then((result) => res.json(result))
    .catch((err) => res.status(403).send(err));
}

async function getGameAPI(req: any, res: express.Response) {
  const username: string = req.user!.username;
  const goid = req.params.goid;

  if (checkAuth(username, goid))
    getGame(goid)
      .then((result) => res.json(result))
      .catch((err) => res.status(403).send(err));
  else res.status(404).send("Auth Error");
}

async function createGameAPI(req: any, res: express.Response) {
  const username: string = req.user!.username;
  const opponent_username: string = req.body.opponent_username;

  createGame(username, opponent_username)
    .then((result) => res.json(result))
    .catch((err) => res.status(403).send(err));
}

async function deleteGameAPI(req: any, res: express.Response) {
  const username: string = req.user!.username;
  const goid = req.params.goid;

  if (checkAuth(username, goid))
    deleteGame(username, goid)
      .then((result) => res.send(`delete ${result}`))
      .catch((err) => res.status(403).send(err));
  else res.status(404).send("Auth Error");
}

/* ------------------------------------------ */
/* /api/go/ */
/* req.user must be required */

router.get("/", getAllGameAPI);
/**
 * query: {
 *  goid: string
 * }
 */
router.get("/:goid", getGameAPI);
/**
 * body: {
 *  opponent_username: string
 * }
 */
router.post("/", createGameAPI);
/**
 * query: {
 *  goid: string
 * }
 */
router.delete("/:goid", deleteGameAPI);

export default router;

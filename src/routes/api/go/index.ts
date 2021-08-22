import express, { Router, Request, Response } from "express";
import { getGame, createGame, getAllGames, updateGame } from "./go.controller";
import { v4 as uuidv4 } from "uuid";
import config from "../../../config";

const router = Router();

function handleResponse(
  promise: Promise<[number, any?]>,
  errorCodes: { [code: number]: string },
  res: Response
) {
  promise
    .then(([code, game]) => {
      if (code === 200) res.json(game);
      else res.status(code).json({ code, message: errorCodes[code] });
    })
    .catch((err) => res.status(500).send(err));
}

export async function getAllGameAPI(req: Request, res: Response) {
  const errorCodes: { [code: number]: string } = {
    401: "Authentication error",
  };
  handleResponse(getAllGames(), errorCodes, res);
}

export async function getGameAPI(req: Request, res: Response) {
  const errorCodes: { [code: number]: string } = {
    400: "Game not exists",
    401: "Authentication error",
  };
  const id = req.params.id as string;
  handleResponse(getGame(id), errorCodes, res);
}

export async function createGameAPI(req: Request, res: Response) {
  const errorCodes: { [code: number]: string } = {
    400: "Game not exists",
    401: "Authentication error",
  };
  const id = uuidv4();
  const { logs } = req.body;
  handleResponse(createGame({ id, logs }), errorCodes, res);
}

export async function patchGameAPI(req: Request, res: Response) {
  const errorCodes: { [code: number]: string } = {
    400: "Game not exists",
    401: "Authentication error",
  };
  const { logs, id } = req.body;
  handleResponse(updateGame(id, { id, logs }), errorCodes, res);
}

/* ------------------------------------------ */
/* /api/go */

router.get("/", getAllGameAPI);
router.get("/:id", getGameAPI);
router.post("/", createGameAPI);
router.patch("/", patchGameAPI);

export default router;

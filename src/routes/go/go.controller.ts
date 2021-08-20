import { IUserType } from "../../../.backup/user/types";
import UserModel from "../../../.backup/user/model";
import GoModel from "../../database/go/model";
import { IGoDocument, IGoType } from "../../database/go/types";
import e from "express";

export async function getAllGame(username: string): Promise<IGoDocument[]> {
  const game = await GoModel.findAllByUserId(username);
  if (game === null) throw new Error("Game doesn't exist");
  return game;
}

export async function getGame(goid: string): Promise<IGoType> {
  const game = await GoModel.findById(goid);
  if (game === null) throw new Error("Game doesn't exist");
  return game;
}

// 결투를 신청한 사람이 백
export async function createGame(username: string, opponent_username: string) {
  const game = await GoModel.create({
    blackid: opponent_username,
    whiteid: username,
    logs: "",
  });
  return await game.save();
}

export async function deleteGame(username: string, goid: string) {
  const game = await GoModel.findById(goid);
  if (game === null) throw new Error("ID Invalid");

  const { whiteid, blackid } = game;

  if (whiteid === username) await game.resetID(false, true);
  if (blackid === username) await game.resetID(true, false);

  if (whiteid && blackid) return false;
  if (whiteid !== username && blackid !== username) return false;
  else return await GoModel.deleteByGoid(goid);
}

// export async function updateGame(goid: string ){}

export async function checkAuth(username: string, goid: string) {
  const game = await GoModel.findById(goid);
  console.log(game);
  if (game === null) return false;
  if (game.whiteid === username || game.blackid === username) return true;
  else return false;
}

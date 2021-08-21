import goModel, { Go } from "../../../models/go";

export async function getAllGames(): Promise<[number, Go[]]> {
  const games = await goModel.getAll();
  return [200, games];
}

export async function getGame(id: string): Promise<[number, Go?]> {
  const game = await goModel.getById(id);
  if (game === null) return [400];
  return [200, game];
}

export async function createGame(props: Go): Promise<[number, Go?]> {
  const game = await goModel.create(props);
  return [200, game];
}

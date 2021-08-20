import { Document } from "mongoose";
import { IGoDocument } from "./types";

export async function resetID(
  this: IGoDocument,
  deleteBlackid: boolean = false,
  deleteWhiteid: boolean = false
): Promise<IGoDocument> {
  if (deleteBlackid) await this.updateOne({ $set: { blackid: "" } });
  else if (deleteWhiteid) await this.updateOne({ $set: { whiteid: "" } });
  return this;
}

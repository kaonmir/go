import { IGoModel, IGoType } from "./types";

export async function findAll(this: IGoModel) {
  return this.find({});
}

export async function findByGoid(this: IGoModel, goid: Number) {
  return this.findOne({ goid });
}

export async function findByUserId(this: IGoModel, userid: String) {
  return Promise.all([
    this.findOne({ whiteid: userid }),
    this.findOne({ blackid: userid }),
  ]).then(([whiteDoc, blackDoc]) => whiteDoc ?? blackDoc);
}

export async function updateByGoid(
  this: IGoModel,
  goid: Number,
  payload: IGoType
) {
  return this.findOneAndUpdate({ goid }, payload, { new: true });
}

export async function deleteByGoid(this: IGoModel, goid: Number) {
  return this.remove({ goid });
}

import { IGoDocument, IGoModel, IGoType } from "./types";

export async function findAll(this: IGoModel) {
  return this.find({});
}

export async function findAllByUserId(this: IGoModel, userid: string) {
  return Promise.all([
    this.find({ whiteid: userid }),
    this.find({ blackid: userid }),
  ]).then(([whiteDocs, blackDocs]) => [...whiteDocs, ...blackDocs]);
}

export async function findByGoid(this: IGoModel, goid: string) {
  return this.findOne({ _id: goid });
}

export async function updateByGoid(
  this: IGoModel,
  goid: string,
  payload: IGoType
) {
  return this.findOneAndUpdate({ _id: goid }, payload, { new: true });
}

export async function deleteByGoid(this: IGoModel, goid: string) {
  return this.deleteOne({ _id: goid }).then(() => true);
}

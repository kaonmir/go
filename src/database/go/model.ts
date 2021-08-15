import mongoose, { Schema, model } from "mongoose";
import { IGoDocument, IGoModel } from "./types";
import * as statics from "./statics";
import * as methods from "./methods";

const GoSchema = new Schema<IGoDocument, IGoModel>(
  {
    goid: mongoose.Types.ObjectId,
    whiteid: { type: String, required: true },
    blackid: { type: String, required: true },
    logs: {
      type: String,
      default: "",
      match: /([0-9]{1,2} )*([0-9]{1,2})/,
    },
  },
  { timestamps: true }
);

GoSchema.statics = { ...GoSchema.statics, ...statics };
GoSchema.methods = { ...GoSchema.methods, ...methods };

export default model<IGoDocument, IGoModel>("go", GoSchema);

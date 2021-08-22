import mongoose, { Schema } from "mongoose";
import IModel from "./intreface";

export interface Go {
  id: string;
  logs: string;
}

const goSchema = new mongoose.Schema<Go>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  logs: {
    type: String,
    required: true,
    match: /^([0-9]{1,2} )*([0-9]{1,2})$/,
  },
});

const GoModel = mongoose.model<Go>("Go", goSchema);

// --- //

const IGo: IModel<Go> = {
  getAll: async () => {
    const go = await GoModel.find();
    return go as Go[];
  },
  getById: async (id: string) => {
    const go = await GoModel.findOne({ id });
    return go as Go;
  },

  create: async (props: Go): Promise<Go> => {
    const go = await GoModel.create(props);
    return go as Go;
  },

  updateById: async (id: string, props: Go): Promise<Go> => {
    await GoModel.updateOne({ id }, { $set: props });
    const go = await GoModel.findOne({ id });
    return go as Go;
  },
};

export default IGo;

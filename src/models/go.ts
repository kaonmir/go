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
    const games = await GoModel.find();
    return games as Go[];
  },
  getById: async (id: string) => {
    const game = await GoModel.findOne({ id });
    return game as Go;
  },

  create: async (props: Go): Promise<Go> => {
    console.log(props);

    const go = await GoModel.create(props);
    return go.toObject();
  },
};

export default IGo;

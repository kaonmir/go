import config from "../config";
import mongoose from "mongoose";
import { Db } from "mongodb";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};

import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT!,
  DATABASE_URL: process.env.MONGO_URI!,
  SECRET_KEY: process.env.SECRET_KEY!,
};

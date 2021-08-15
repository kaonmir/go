import express from "express";
import morgan from "morgan";
import config from "../config";

const expressLoader = async (app: express.Express) => {
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.set("jwt-secret", config.SECRET_KEY);
};

export default expressLoader;

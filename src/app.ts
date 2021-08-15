import express from "express";
import config from "./config";
import loaders from "./loaders";
import routers from "./routes";

async function startServer() {
  const app = express();

  await loaders.init(app);
  app.use("/", routers);

  app.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}`)
  );
}

startServer();

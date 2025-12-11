import express from "express";
import { config } from "dotenv";
import { log } from "console";
import { bootstrap } from "./app.controller";
import { devConfig } from "./config/local.config";
config();
const app = express();
const port = devConfig.port;
bootstrap(app, express);
app.listen(port, () => {
  log("server is running on port", port);
});

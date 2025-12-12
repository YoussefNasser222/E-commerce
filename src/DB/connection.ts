import { log } from "console";
import mongoose from "mongoose";
import { devConfig } from "../config/local.config";

export const connectDB = () => {
  mongoose
    .connect(devConfig.DB_URL)
    .then(() => {
      log("connected db successfully");
    })
    .catch((err) => {
      log("field to connect to DB" , err);
    });
};

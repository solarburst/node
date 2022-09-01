import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import winston from "winston";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import ChatRouter from "../routes/chats.js";
import MessageRouter from "../routes/messages.js";

config();

const PORT = process.env.PORT;

const app = express();

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/requests.log",
    }),
  ],
});

app.use(helmet());

app.use(cors());

app.use((req, res, next) => {
  logger.log("info", `${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO).catch((error) => console.log(error));

app.get("/status", (req, res) => res.send("OK"));

app.use("/chats", ChatRouter);
app.use("/messages", MessageRouter);

app.listen(PORT, () =>
  console.log(`Server has been started to http://localhost:${PORT}`)
);

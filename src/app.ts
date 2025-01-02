import express, { json, urlencoded } from "express";
import router from "./router/router";
import cors from "cors";

process.loadEnvFile();
const { CLIENT_URL } = process.env;

const server = express();

server.use(
  cors({
    origin: CLIENT_URL,
  })
);
server.use(json());
server.use(urlencoded({ extended: true }));

server.use(router);

export default server;

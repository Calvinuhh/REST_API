import express, { json, urlencoded } from "express";
import router from "./router/router";

process.loadEnvFile();

const server = express();

server.use(json());
server.use(urlencoded({ extended: true }));

server.use(router);

export default server;

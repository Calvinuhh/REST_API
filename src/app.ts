import express, { json, urlencoded } from "express";
import router from "./router/router";

const server = express();

server.use(json());
server.use(urlencoded({ extended: true }));

server.use(router);

export default server;

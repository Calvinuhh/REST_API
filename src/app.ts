import express, { json } from "express";
import router from "./router/router";

const server = express();

server.use(json());

server.use(router);

export default server;

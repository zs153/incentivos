import express from "express";
import { mainPage, buscarPage } from "../controllers/main.controller";

const mainRouter = express.Router();

// paginas
mainRouter.get("/", mainPage);
mainRouter.get("/buscar", buscarPage);

export default mainRouter;
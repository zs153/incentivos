import express from "express";
import authRoutes from '../middleware/auth'
import { mainPage, buscarPage, loginPage, cleanPage } from "../controllers/main.controller";

const mainRouter = express.Router();

// paginas
mainRouter.get("/", mainPage);
mainRouter.get("/buscar", buscarPage);
mainRouter.get("/login", loginPage);
mainRouter.get('/clean', authRoutes, cleanPage)

export default mainRouter;
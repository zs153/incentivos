// imports
import express from "express";
import authRoutes from '../middleware/auth'
import { mainPage, buscarPage, loginPage, cleanPage } from "../controllers/main/inicio.controller";

const mainRouter = express.Router();

// pages
mainRouter.get("/", mainPage);
mainRouter.get("/buscar", buscarPage);
mainRouter.get("/login", loginPage);
mainRouter.get('/clean', authRoutes, cleanPage)

// proc

// exports
export default mainRouter;
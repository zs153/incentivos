import express from "express";
import {
  entidad,
  entidades,
  crear,
  modificiar,
  borrar,
} from "../controllers/entidad.controller";

const apiUsuarioRouter = express.Router();

// entidades
apiUsuarioRouter.post("/entidad", entidad);
apiUsuarioRouter.post("/entidades", entidades);
apiUsuarioRouter.post("/entidades/insert", crear);
apiUsuarioRouter.post("/entidades/update", modificiar);
apiUsuarioRouter.post("/entidades/delete", borrar);

export default apiUsuarioRouter;
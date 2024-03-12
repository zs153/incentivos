import express from "express";
import {
  usuario,
  usuarios,
  crear,
  modificar,
  borrar,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios", usuarios);
apiUsuarioRouter.post("/usuarios/insert", crear);
apiUsuarioRouter.post("/usuarios/update", modificar);
apiUsuarioRouter.post("/usuarios/delete", borrar);

export default apiUsuarioRouter;
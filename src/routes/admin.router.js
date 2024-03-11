import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";

import * as entidad from '../controllers/admin/entidad.controller'
import * as usuario from '../controllers/admin/usuario.controller'

const adminRouter = express.Router()

//--------------- paginas
// entidades
adminRouter.get('/entidades', verifyTokenAndAdmin, entidad.mainPage)
adminRouter.get('/entidades/add', verifyTokenAndAdmin, entidad.addPage)
adminRouter.get('/entidades/edit/:id', verifyTokenAndAdmin, entidad.editPage)
// usuarios
adminRouter.get('/usuarios', verifyTokenAndAdmin, usuario.mainPage)
adminRouter.get('/usuarios/add', verifyTokenAndAdmin, usuario.addPage)
adminRouter.get('/usuarios/edit/:id', verifyTokenAndAdmin, usuario.editPage)

//--------------- procedures
// entidades
adminRouter.post('/entidades/insert', verifyTokenAndAdmin, entidad.insert)
adminRouter.post('/entidades/update', verifyTokenAndAdmin, entidad.update)
adminRouter.post('/entidades/delete', verifyTokenAndAdmin, entidad.remove)
// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndAdmin, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndAdmin, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndAdmin, usuario.remove)

export default adminRouter
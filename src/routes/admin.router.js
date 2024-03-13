import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";

import * as admin from '../controllers/admin/admin.controller'
import * as entidad from '../controllers/admin/entidad.controller'
import * as usuario from '../controllers/admin/usuario.controller'
import * as carga from '../controllers/admin/carga.controller'

const adminRouter = express.Router()

//--------------- paginas
// main
adminRouter.get('/', verifyTokenAndAdmin, admin.mainPage)
// entidades
adminRouter.get('/entidades', verifyTokenAndAdmin, entidad.mainPage)
adminRouter.get('/entidades/add', verifyTokenAndAdmin, entidad.addPage)
adminRouter.get('/entidades/edit/:id', verifyTokenAndAdmin, entidad.editPage)
// usuarios
adminRouter.get('/usuarios', verifyTokenAndAdmin, usuario.mainPage)
adminRouter.get('/usuarios/add', verifyTokenAndAdmin, usuario.addPage)
adminRouter.get('/usuarios/edit/:id', verifyTokenAndAdmin, usuario.editPage)
// cargas
adminRouter.get('/cargas', verifyTokenAndAdmin, carga.mainPage)
adminRouter.get('/cargas/add', verifyTokenAndAdmin, carga.addPage)

//--------------- procedures
// entidades
adminRouter.post('/entidades/insert', verifyTokenAndAdmin, entidad.insert)
adminRouter.post('/entidades/update', verifyTokenAndAdmin, entidad.update)
adminRouter.post('/entidades/delete', verifyTokenAndAdmin, entidad.remove)
// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndAdmin, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndAdmin, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndAdmin, usuario.remove)
// cargas
adminRouter.post('/cargas/insert', verifyTokenAndAdmin, carga.insert)

export default adminRouter
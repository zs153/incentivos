import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";

import * as entidad from '../controllers/admin/entidad.controller'

const adminRouter = express.Router()

//--------------- paginas
// entidades
adminRouter.get('/entidades', verifyTokenAndAdmin, entidad.mainPage)
adminRouter.get('/entidades/add', verifyTokenAndAdmin, entidad.addPage)
adminRouter.get('/entidades/edit/:id', verifyTokenAndAdmin, entidad.editPage)

//--------------- procedures
// entidades
adminRouter.post('/entidades/insert', verifyTokenAndAdmin, entidad.insert)
adminRouter.post('/entidades/update', verifyTokenAndAdmin, entidad.update)
adminRouter.post('/entidades/delete', verifyTokenAndAdmin, entidad.remove)

export default adminRouter
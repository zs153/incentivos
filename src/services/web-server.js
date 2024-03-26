import http from 'http'
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { port } from '../config/settings'
// routes
import apiEntidadRouter from '../routes/entidad.router'
import apiUsuarioRouter from '../routes/usuario.router'
import apiCargaRouter from '../routes/carga.router'

let httpServer

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())

    // routes
    app.use('/api', apiEntidadRouter)
    app.use('/api', apiUsuarioRouter)
    app.use('/api', apiCargaRouter)

    // server
    httpServer
      .listen(port)
      .on('listening', () => {
        console.log(`Web server listening on conexion: port:${port} `)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}
module.exports.close = close
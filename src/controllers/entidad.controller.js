import * as DAL from '../models/entidad.model'

export const entidad = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err.message })
  }
}
export const entidades = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findAll(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err.message })
  }
}

export const crear = async (req, res) => {
  // context
  const entidad = {
    NIFENT: req.body.entidad.NIFENT,
    DESENT: req.body.entidad.DESENT,
    ADMENT: req.body.entidad.ADMENT,
    TIPINC: req.body.entidad.TIPINC,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(entidad, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err.message })
  }
}
export const modificiar = async (req, res) => {
  // context
  const entidad = {
    IDENTI: req.body.entidad.IDENTI,
    NIFENT: req.body.entidad.NIFENT,
    DESENT: req.body.entidad.DESENT,
    ADMENT: req.body.entidad.ADMENT,
    TIPINC: req.body.entidad.TIPINC,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(entidad, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err.message })
  }
}
export const borrar = async (req, res) => {
  // context
  const entidad = {
    IDENTI: req.body.entidad.IDENTI,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(entidad, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err.message })
  }
}

import * as DAL from '../models/entidad.model'

export const entidad = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

export const crear = async (req, res) => {
  // context
  const entidad = {
    NOMUSU: req.body.entidad.NOMUSU,
    OFIUSU: req.body.entidad.OFIUSU,
    ROLUSU: req.body.entidad.ROLUSU,
    USERID: req.body.entidad.USERID,
    EMAUSU: req.body.entidad.EMAUSU,
    PERUSU: req.body.entidad.PERUSU,
    TELUSU: req.body.entidad.TELUSU,
    STAUSU: req.body.entidad.STAUSU,
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificiar = async (req, res) => {
  // context
  const entidad = {
    IDUSUA: req.body.entidad.IDUSUA,
    NOMUSU: req.body.entidad.NOMUSU,
    OFIUSU: req.body.entidad.OFIUSU,
    ROLUSU: req.body.entidad.ROLUSU,
    EMAUSU: req.body.entidad.EMAUSU,
    PERUSU: req.body.entidad.PERUSU,
    TELUSU: req.body.entidad.TELUSU,
    STAUSU: req.body.entidad.STAUSU,
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const entidad = {
    IDUSUA: req.body.entidad.IDUSUA,
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

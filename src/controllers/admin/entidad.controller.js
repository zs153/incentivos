// imports
import axios from 'axios'
import { serverAPI,puertoAPI } from '../../config/settings'
import { arrTiposRol,tiposMovimiento,arrTiposIncentivo } from '../../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevEntis = cursor ? true:false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/entidades`, {
      context,
    })

    let entidades = result.data.data
    let hasNextEntis = entidades.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNextEntis) {
      nextCursor= dir === 'next' ? entidades[limit - 1].DESENT : entidades[0].DESENT
      prevCursor = dir === 'next' ? entidades[0].DESENT : entidades[limit - 1].DESENT

      entidades.pop()
    } else {
      nextCursor = dir === 'next' ? '' : entidades[0]?.DESENT
      prevCursor = dir === 'next' ? entidades[0]?.DESENT : ''
      
      if (cursor) {
        hasNextEntis = nextCursor === '' ? false : true
        hasPrevEntis = prevCursor === '' ? false : true
      } else {
        hasNextEntis = false
        hasPrevEntis = false
      }
    }

    if (dir === 'prev') {
      entidades = entidades.sort((a,b) => a.DESENT > b.DESENT ? 1:-1)
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }    
    const datos = {
      entidades,
      hasPrevEntis,
      hasNextEntis,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/entidades', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const filteredRol = arrTiposRol.filter(itm => itm.id <= user.rol)

  try {
    const datos = {
      filteredRol,
      arrTiposIncentivo,
    }

    res.render('admin/entidades/add', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const filteredRol = arrTiposRol.filter(itm => itm.id <= user.rol)

  try {
    const entidad = await axios.post(`http://${serverAPI}:${puertoAPI}/api/entidad`, {
      context: {
        IDENTI: req.params.id,
      },
    })

    console.log('entidad...', entidad);
    if (entidad.data.stat === 0) {
      res.render("admin/error400", {
        alerts: [{ msg: entidad.data.data }],
      });
    } else {
      const datos = {
        entidad: entidad.data.data[0],
        filteredRol,
        arrTiposIncentivo,
      }
  
      res.render('admin/entidades/edit', { user, datos })
    }
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}

// proc
export const insert = async (req, res) => {
  const user = req.user

  try {
    const entidad = {
      NIFENT: req.body.nifent.toUpperCase(),
      DESENT: req.body.desent.toUpperCase(),
      ADMENT: req.body.adment.toUpperCase(),
      TIPINC: req.body.tipinc,
    }
    const movimiento = {
      USUMOV: user.id,
      TIPMOV: tiposMovimiento.crearEntidad,
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/entidades/insert`, {
      entidad,
      movimiento,
    })

    res.redirect(`/admin/entidades?part=${req.query.part}`)
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}
export const update = async (req, res) => {
  const user = req.user
  const entidad = {
    IDENTI: req.body.identi,
    NIFENT: req.body.nifent.toUpperCase(),
    DESENT: req.body.desent.toUpperCase(),
    ADMENT: req.body.adment.toUpperCase(),
    TIPINC: req.body.tipinc,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarEntidad,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/entidades/update`, {
      entidad,
      movimiento,
    })

    res.redirect(`/admin/entidades?part=${req.query.part}`)
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const entidad = {
    IDENTI: req.body.identi,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarEntidad,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/entidades/delete`, {
      entidad,
      movimiento,
    })

    res.redirect(`/admin/entidades?part=${req.query.part}`)
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}
// imports
import axios from 'axios'
import { serverAPI,puertoAPI } from '../../config/settings'
import { arrTiposRol,estadosUsuario,tiposMovimiento } from '../../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true:false
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNextUsers) {
      nextCursor= dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''
      
      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a,b) => a.NOMUSU > b.NOMUSU ? 1:-1)
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }    
    const datos = {
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/usuarios', { user, datos })
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
    }

    res.render('admin/usuarios/add', { user, datos })
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
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        IDUSUA: req.params.id,
      },
    })
    
    if (usuario.data.stat === 0) {
      res.render("admin/error400", {
        alerts: [{ msg: usuario.data.data }],
      });
    } else {
      const datos = {
        usuario: usuario.data.data[0],
        filteredRol,
      }

      res.render('admin/usuarios/edit', { user, datos })
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
    const usuario = {
      NOMUSU: req.body.nomusu.toUpperCase(),
      ROLUSU: req.body.rolusu,
      USERID: req.body.userid.toLowerCase(),
      EMAUSU: req.body.emausu,
      TELUSU: req.body.telusu,
      STAUSU: estadosUsuario.activo,
    }
    const movimiento = {
      USUMOV: user.id,
      TIPMOV: tiposMovimiento.crearUsuario,
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/insert`, {
      usuario,
      movimiento,
    })

    res.redirect(`/admin/usuarios?part=${req.query.part}`)
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
  const usuario = {
    IDUSUA: req.body.idusua,
    NOMUSU: req.body.nomusu.toUpperCase(),
    ROLUSU: req.body.rolusu,
    EMAUSU: req.body.emausu,
    TELUSU: req.body.telusu,
    STAUSU: estadosUsuario.activo
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarUsuario,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/update`, {
      usuario,
      movimiento,
    })

    res.redirect(`/admin/usuarios?part=${req.query.part}`)
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
  const usuario = {
    IDUSUA: req.body.idusua,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuario,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/delete`, {
      usuario,
      movimiento,
    })

    res.redirect(`/admin/usuarios?part=${req.query.part}`)
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
import axios from 'axios'
import { serverAPI,puertoAPI,serverAUTH,puertoAUTH,serverWEB, puertoWEB } from '../config/settings'
import { arrTiposIncentivo } from '../public/js/enumeraciones'

// paginas
export const mainPage = async (req, res) => {
  res.render('user')
}
export const buscarPage = async (req, res) => {
  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevEntidades = cursor ? true:false
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
    let hasNextEntidades = entidades.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNextEntidades) {
      nextCursor= dir === 'next' ? entidades[limit - 1].DESENT : entidades[0].DESENT
      prevCursor = dir === 'next' ? entidades[0].DESENT : entidades[limit - 1].DESENT

      entidades.pop()
    } else {
      nextCursor = dir === 'next' ? '' : entidades[0]?.DESENT
      prevCursor = dir === 'next' ? entidades[0]?.DESENT : ''
      
      if (cursor) {
        hasNextEntidades = nextCursor === '' ? false : true
        hasPrevEntidades = prevCursor === '' ? false : true
      } else {
        hasNextEntidades = false
        hasPrevEntidades = false
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
      hasPrevEntidades,
      hasNextEntidades,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      part,
      arrTiposIncentivo,
    }

    res.render('user/buscar', {datos})
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const loginPage = async (req, res) => {
  const strUrl = encodeURIComponent(`${serverWEB}:${puertoWEB}`);

  res.redirect(`http://${serverAUTH}:${puertoAUTH}/log/login/?valid=${strUrl}`)
}
export const cleanPage = async (req, res) => {
  const user = req.user
  const datos = {
    serverWEB,
    puertoWEB,
  }

  res.render('clean', { user, datos })
}

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}

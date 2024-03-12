import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT uu.* FROM usuarios uu";
const insertSql = "BEGIN INCENTIVOS_PKG.INSERTUSUARIO(:nomusu,:rolusu,:userid,:emausu,:telusu,:stausu,:usumov,:tipmov,:idusua); END;";
const updateSql = "BEGIN INCENTIVOS_PKG.UPDATEUSUARIO(:idusua,:nomusu,:rolusu,:emausu,:telusu,:stausu,:usumov,:tipmov); END;";
const removeSql = "BEGIN INCENTIVOS_PKG.DELETEUSUARIO(:idusua,:usumov,:tipmov); END;";

export const find = async (context) => {
  // bind
  let query = baseQuery;
  const bind = context

  if (context.IDUSUA) {
    query += " WHERE uu.idusua = :idusua";
  } else if (context.USERID) {
    query += " WHERE uu.userid = :userid";
  } else if (context.EMAUSU) {
    query += " WHERE uu.emausu = :emausu";
  } 

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const findAll = async (context) => {
  // bind
  let query = "WITH datos AS (SELECT uu.idusua,uu.userid,uu.nomusu,uu.telusu,uu.stausu FROM usuarios uu WHERE uu.nomusu LIKE '%' || :part || '%' OR :part IS NULL)";
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query += "SELECT * FROM datos WHERE nomusu > :nomusu OR :nomusu IS NULL ORDER BY nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query += "SELECT * FROM datos WHERE nomusu < :nomusu OR :nomusu IS NULL ORDER BY nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insert = async (context) => {
  // bind
  let bind = context
  bind.IDUSUA = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDUSUA = ret.outBinds.IDUSUA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const update = async (context) => {
  // bind
  const bind = context
  console.log(bind, updateSql);
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const remove = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};

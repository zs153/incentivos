import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT ee.* FROM entidades ee";
const insertSql = "BEGIN INCENTIVO_PKG.INSERTENTIDAD(:nifent,:desent,:adment,:obsent,:staent,:status,:usumov,:tipmov,:identi); END;";
const updateSql = "BEGIN INCENTIVO_PKG.UPDATEENTIDAD(:identi,:nifent,:desent,:adment,:obsent,:staent,:status,:usumov,:tipmov); END;";
const removeSql = "BEGIN INCENTIVO_PKG.DELETEENTIDAD(:identi,:usumov,:tipmov); END;";

export const find = async (context) => {
  // bind
  let query = baseQuery;
  const bind = context

  if (context.IDENTI) {
    query += " WHERE ee.identi = :identi";
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
  let query = "WITH datos AS (SELECT ee.* FROM entidades ee WHERE ee.desent LIKE '%' || :part || '%' OR ee.nifent = :part OR :part IS NULL)";
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.desent = context.cursor.next === '' ? null : context.cursor.next;
    query += "SELECT * FROM datos WHERE desent > :desent OR :desent IS NULL ORDER BY desent ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.desent = context.cursor.prev === '' ? null : context.cursor.prev;
    query += "SELECT * FROM datos WHERE desent < :desent OR :desent IS NULL ORDER BY desent DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.IDENTI = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDENTI = ret.outBinds.IDENTI
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const update = async (context) => {
  // bind
  const bind = context
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
import oracledb from 'oracledb'
import { dbPool } from '../config/settings'

const initialize = async () => {
   await oracledb.createPool(dbPool)
}
module.exports.initialize = initialize

const close = async () => {
  await oracledb.getPool().close(10)
}
module.exports.close = close

const simpleExecute = (sql, binds = [], opts = {}) => {
  return new Promise(async (resolve, reject) => {
    let conn

    opts.outFormat = oracledb.OBJECT
    opts.autoCommit = true   // (solo si hay actualizaciones)
    // opts.prefetchRows = 12   // (numero de rows + 1)
    // opts.fetchArraySize = 11 // (numero de rows en la sentencia sql)
    
    const pool = oracledb.getPool()
    
    try {
      conn = await pool.getConnection()

      const result = await conn.execute(sql, binds, opts)

      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (err) {
          console.error(err)
        }
      }
    }
  })
}
module.exports.simpleExecute = simpleExecute

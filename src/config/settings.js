import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/./../../.env' })

export const port = process.env.PORT_API
export const dbPool = {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  poolMin: 4,
  poolMax: 64,
  poolIncrement: 1,
  poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
  poolTimeout: 30, // terminate connections that are idle in the pool for 30 seconds
  queueTimeout: 2000, // terminate getConnection() calls queued for longer than 2000 milliseconds
}
export const maxRows = 50000
export const batchSize = 1000
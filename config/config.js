
module.exports = {
   development:{  dialect:process.env.SQL_SERVER_DB_DIALECT,
                   host: process.env.SQL_SERVER_HOST ,
                   port: process.env.SQL_SERVER_PORT ,
                   database: process.env.SQL_SERVER_DB,
                   username: process.env.SQL_SERVER_USER,
                   password: process.env.SQL_SERVER_PASSWORD,
                }
}

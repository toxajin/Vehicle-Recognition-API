const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '4608',
      database : 'vehiclerecdb'
    }
  });

  module.exports = {db};
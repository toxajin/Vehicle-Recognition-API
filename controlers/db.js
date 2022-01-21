const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
<<<<<<< HEAD
      connectionString : process.env.DATABASE_URL,
      ssl:true
=======
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'vehiclerecdb'
>>>>>>> 008d6cb6b2c0baccc0bb43173f786a754a7bba14
    }
  });

  module.exports = {db};

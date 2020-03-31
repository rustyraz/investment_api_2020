
module.exports = {

    development: {
      client: 'postgresql',
      connection: {
        host: '127.0.0.1',
        database: 'investments_api',
        user:     'postgres',
        password: 'root'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    staging: {
  
    },
  
    production: {
      client: 'postgresql',
      connection: {
        host: '127.0.0.1',
        database: 'investments_api',
        user:     'postgres',
        password: 'root'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  
  };
  
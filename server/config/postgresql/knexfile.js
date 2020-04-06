
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
  
    test: {
      client: 'postgresql',
      connection: {
        host: '127.0.0.1',
        database: 'investments_api_test',
        user:     'postgres',
        password: 'root'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './server/config/postgresql/migrations'
      },
      seeds:{
        directory:'./server/config/postgresql/seeds'
      }
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
  
// Update with your config settings.

export default {

  development: {
    client: 'pg',
    connection: {
      database: 'back_end_teste',
      user:     'postgres',
      password: '000000'
    },
    migrations: {
      tableName: 'knex_migration',
      directory: `${__dirname}/src/database/migration`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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

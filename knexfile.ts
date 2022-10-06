import * as dotenv from 'dotenv';

dotenv.config();

export default { main: {
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: parseInt(process.env.DATABASE_PORT as string, 10),
        database: process.env.DATABASE_NAME,
    },
    migrations: {
        tableName: 'knex_migrations',
    }
} };
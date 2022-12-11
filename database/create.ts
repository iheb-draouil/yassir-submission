import knex from 'knex';
import configs from '../knexfile';

const { main: { client, connection } } = configs;

knex({
    client: client,
    connection: {
        host: connection.host,
        user: connection.user,
        password: connection.password,
        port: connection.port,
    }
})
.raw(`CREATE SCHEMA IF NOT EXISTS \`${connection.database}\``)
.then(() => process.exit(0));
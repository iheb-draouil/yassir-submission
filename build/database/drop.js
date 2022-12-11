"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const knexfile_1 = require("../knexfile");
const { main: { client, connection } } = knexfile_1.default;
(0, knex_1.default)({
    client: client,
    connection: {
        host: connection.host,
        user: connection.user,
        password: connection.password,
        port: connection.port,
    }
})
    .raw(`DROP SCHEMA IF EXISTS \`${connection.database}\``)
    .then(() => process.exit(0));
//# sourceMappingURL=drop.js.map
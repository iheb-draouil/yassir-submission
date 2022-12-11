if (process.env.DATABASE_PORT === undefined
    || process.env.DATABASE_NAME === undefined
    || process.env.DATABASE_HOST === undefined
    || process.env.DATABASE_USER === undefined
    || process.env.DATABASE_PASSWORD === undefined) {
    throw new Error('Missing environment variables for database intialization');
}

export default { main: {
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: parseInt(process.env.DATABASE_PORT as string, 10),
        database: process.env.DATABASE_NAME,
    },
} };
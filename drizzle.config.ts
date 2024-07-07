import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./database/schema.ts",
    out: './database/migrations',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DATABASE_HOST ?? "",
        user: process.env.DATABASE_USER ?? "",
        password: process.env.DATABASE_USER_PASSWORD ?? "",
        database: process.env.DATABASE_NAME ?? "",
    }
})

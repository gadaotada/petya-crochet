import { sql } from 'drizzle-orm';
import { index, mysqlTable, datetime, varchar, mysqlEnum, text, int } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
    id: varchar("id", { length: 255 }).primaryKey(),
    profile: varchar('profile', { length: 256 }).notNull(),
    password: text('password').notNull(),
    displayName: varchar('displayName', { length: 256 }),
    role: mysqlEnum('role', ['Admin', 'User']).notNull().default('User')
}, (users) => ({
  nameIdx: index('name_idx').on(users.displayName),
}));

export const sessionTable = mysqlTable("session", {
	id: varchar("id", { length: 255 }).primaryKey(),
	userId: varchar("user_id", { length: 255 }).notNull().references(() => userTable.id),
	expiresAt: datetime("expires_at").notNull()
});

export const analyticsTable = mysqlTable('analytics', {
  id: int("id").primaryKey().autoincrement(),
  userAgent: text('user_agent').notNull(),
  userType: mysqlEnum('user_type', ['human', 'bot']).notNull().default('human'),
  referer: text('referer').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }).notNull(),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
  source: varchar('source', { length: 255 }).notNull()
});
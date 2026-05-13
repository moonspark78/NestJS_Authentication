import { pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';
import { text } from 'stream/consumers';

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
});




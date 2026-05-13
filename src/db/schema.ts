import { boolean } from 'drizzle-orm/gel-core';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    name: text('name').notNull(),
    role: userRoleEnum('role').notNull().default('user'),
    isVerified: boolean('is_verified').notNull().default(false),
    verificationToken: text('verification_token'),
});




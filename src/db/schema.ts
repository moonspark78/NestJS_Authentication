import { pgEnum, pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    name: text('name').notNull(),
    role: userRoleEnum('role').notNull().default('user'),
    isVerified: boolean('is_verified').notNull().default(false),
    verificationToken: text('verification_token'),
    verificationTokenExpiresAt: text('verification_token_expires_at'),
    resetToken: text('reset_token'),
    resetTokenExpiresAt: text('reset_token_expires_at'),
    refreshTokenHash: text('refresh_token_hash'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'done']);

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    status: taskStatusEnum('status').notNull().default('todo'),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});




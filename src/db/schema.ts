import { pgTable } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
    
});




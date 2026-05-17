import { Injectable } from "@nestjs/common";
import { db } from "src/db";
import { users } from "src/db/schema";
import { eq } from "drizzle-orm";
import { NewUser } from "src/db/schema";

@Injectable()
export class UsersService {
    async findByEmail(email: string) {
        return db.query.users.findFirst({
            where: eq(users.email, email)
        });
    }

    async findById(id: string) {
        return db.query.users.findFirst({
            where: eq(users.id, id)
        });
    }

    async create(data: NewUser) {
        const [user] = await db.insert(users).values(data).returning();
        return user;
    }

    async update(id: string, data: Partial<typeof users.$inferInsert>) {
        const [user] = await db
    }
}
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
}
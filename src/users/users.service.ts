import { Injectable } from "@nestjs/common";
import { db } from "src/db";
import { users } from "src/db/schema";
import { eq } from "drizzle-orm";
import { NewUser } from "src/db/schema";
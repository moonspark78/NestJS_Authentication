import { 
    Injectable,
    ConflictException,
    UnauthorizedException,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { UsersService } from "src/users/users.service";
import { EmailService } from "./email.service";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import type { Response } from "express";
import type { User} from "src/db/schema"

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private emailService: EmailService,
        private configService: ConfigService
    ) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);

        if (existingUser) {
            throw new ConflictException("Email is already in use");
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);

        const verificationToken = crypto.randomBytes(32).toString("hex");
    }
}
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
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            passwordHash,
            verificationToken,
            verificationTokenExpiresAt: verificationTokenExpiresAt.toISOString()

        });

        void this.emailService.sendVerificationEmail(user.email, verificationToken);

        return {
            message:
                "Registration successful! Please check your email to verify your account.",
        };
    }

    async login(dto: LoginDto, res:Response) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);

        if (!passwordMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }

        if (!user.isVerified) {
            throw new UnauthorizedException("Please verify your email before logging in");
        }

        const tokens = await this.generateToken(user);
        await this.saveRefreshToken(user.id, tokens.refreshToken);
        this.setRefreshTokenCookie(res, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        }
    }

    async refresh(refreshToken: string, res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException("Refresh token is missing");
        }

        let payload: { sub: string; email: string };
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get("JWT_REFRESH_SECRET"),
            });
        } catch {
            throw new UnauthorizedException("Invalid refresh token");
        }

        const user = await this.usersService.findById(payload.sub);

        if (!user || !user.refreshTokenHash) {
            throw new UnauthorizedException("Invalid refresh token");
        }

        const tokenMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    }

    private async generateToken(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };

        const accessToken = this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN')
        });
        const refreshToken = this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN')
        }); 

        return {
            accessToken: await accessToken,
            refreshToken: await refreshToken,
        };
    }

    private async saveRefreshToken(userId: string, refreshToken: string) {
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
        await this.usersService.update(userId, { refreshTokenHash });
    }

    private setRefreshTokenCookie(res: Response, refreshToken: string) {
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }
}
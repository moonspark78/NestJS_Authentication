import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class EmailService {
    private resend: Resend;

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
    }

    async sendVerificationEmail(email: string, token: string) {
        const appUrl = this.configService.get<string>('APP_URL');
        const verificationUrl = `${appUrl}/api/auth/verify-email?token=${token}`;

        await this.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify Your Email",
            html: `
                <h2>Welcome! Please verify your email address.</h2>
                <p>Click the link below to verify your email address:</p>
                <a href="${verificationUrl}">Verify Email</a>
                <p>If you didn't create an account, you can ignore this email.</p>
            `,
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const appUrl = this.configService.get<string>('APP_URL');
        const resetUrl = `${appUrl}/api/auth/reset-password?token=${token}`;

        await this.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Reset Your Password",
            html: `
                <h2>Forgot Your Password?</h2>
               
            `,
        });
    }

}
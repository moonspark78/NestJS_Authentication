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
    }
}
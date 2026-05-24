import { Injectable } from "@nestjs/common";
import { Resend } from "resend";


@Injectable()
export class EmailService {
    private resend: Resend;
}
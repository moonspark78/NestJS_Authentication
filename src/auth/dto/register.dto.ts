import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class RegisterDto {
    @ApiProperty({ example: "John Doe" })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: "john@example.com" })
    @IsEmail()
    email!: string;
}
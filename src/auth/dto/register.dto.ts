import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class RegisterDto {
    @ApiProperty({ example: "John Doe" })
    @IsString()
    name!: string;
}
import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Res,
    Req,
    HttpCode,
    HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiCookieAuth, ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Response, Request } from 'express'
import type { User } from 'src/db/schema'
import { Public } from '../common/decorators/public.decorator'
import { CurrentUser } from '../common/decorators/current-user.decorator'


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // POST /api/auth/register
    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    // GET /api/auth/verify-email?token=...
    @Public()
    @Get('verify-email')
    @ApiOperation({ summary: 'Verify user email' })
    async verifyEmail(
        @Query('token') token: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.verifyEmail(token, res)
    }

}
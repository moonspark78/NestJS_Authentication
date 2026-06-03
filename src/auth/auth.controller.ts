import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { Public } from '../common/decorators/public.decorator'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'


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

    // POST /api/auth/login
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login and receive access token + refresh token' })
    async login(
        @Body() dto: any,
        @Res({ passthrough: true }) res: Response,
    ){
        return this.authService.login(dto, res)
    }


    // POST /api/auth/refresh
    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token using refresh token cookie' })
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {

        const cookies = req.cookies as Record<string, string>
        const refreshToken = cookies?.refresh_token
        return this.authService.refresh(refreshToken, res)
    }

    // POST /api/auth/logout
    @Post('logout')

}

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
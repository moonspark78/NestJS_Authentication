import { 
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService,
        private usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {}
}
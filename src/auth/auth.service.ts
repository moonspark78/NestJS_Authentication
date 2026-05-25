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


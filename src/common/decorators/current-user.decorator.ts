import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/db/schema';
import { Request } from 'express';

type RequestWithUser = Request & { user: User };

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {};
);
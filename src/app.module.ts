import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [{ provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}

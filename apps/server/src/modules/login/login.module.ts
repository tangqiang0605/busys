import { Logger, Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [LoginService, JwtService, Logger],
})
export class LoginModule {}

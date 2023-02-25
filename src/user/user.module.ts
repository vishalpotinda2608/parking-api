/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratgey } from './jwt.strategy';

@Module({
  // secretkey for JwtModule
  imports:[   JwtModule.register({
    secretOrPrivateKey: 'secret12356789', 

  })],
  controllers: [UserController],
  providers: [UserService,
  JwtStratgey]
})

export class UserModule {}


/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
   imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { OtpService } from './otp.service';

@Controller('otp')
// @UseGuards(JwtAuthGuard)
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  // genrate-OTP
  @Post(`createotp`)
  async findAll(@Body() body) {
    return await this.otpService.createOTP(body.mobileNo);
  }

  // validate-OTP
  @Post(`validateotp`)
  async ValidateOtp(@Body() body) {
    return await this.otpService.validateOTP(body);
  }
}

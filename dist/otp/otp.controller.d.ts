import { OtpService } from './otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    findAll(body: any): Promise<any>;
    ValidateOtp(body: any): Promise<any>;
}

export declare class CreateUserDto {
    otp: number;
    mobileNo: string;
    name: string;
    lastName: string;
    email: string;
    userId: string;
    pin(pin: string, salt: string): void;
}

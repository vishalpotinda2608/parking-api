export class LoginDto {
  
  mobileNo: string;
  
  pin(pin: number, salt: number) {
    throw new Error('Method not implemented.');
  }
}

import { Controller, Get, Post, Body, Patch, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateParkingDto } from './dto/create-Parking.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // usercreated;
  @Post(`/getregister`)
  save(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.save(CreateUserDto);
  }

  // finduserbyid
  // @UseGuards(JwtAuthGuard)
  @Post(`/userbyid`)
  async finduser(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return this.userService.find(CreateUserDto);
  }

  // finduseridbymobileno
  // @UseGuards(JwtAuthGuard)
  @Post(`/userbymobileno`)
  async findAll(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return this.userService.finduser(CreateUserDto);
  }

  // getalluser
  // @UseGuards(JwtAuthGuard)
  @Get(`/getalluser`)
  async getAll(): Promise<any> {
    return await this.userService.getAll();
  }

  // updateemail
  // @UseGuards(JwtAuthGuard)
  @Patch(`/updateemail`)
  async update(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return await this.userService.updateuser(CreateUserDto);
  }

  // enableuser
  // @UseGuards(JwtAuthGuard)
  @Post(`/enableuser`)
  async enableuser(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return await this.userService.enableuser(CreateUserDto);
  }

  // disableuser
  // @UseGuards(JwtAuthGuard)
  @Post(`/disableuser`)
  async disableuser(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return await this.userService.disabletype(CreateUserDto);
  }

  // getalldisableuser
  // @UseGuards(JwtAuthGuard)
  @Get(`/getdisable`)
  async getAlldisable(): Promise<any> {
    return await this.userService.getdisable();
  }

  // getallenableuser
  // @UseGuards(JwtAuthGuard)
  @Get(`/getenable`)
  async getAllenable(): Promise<any> {
    return await this.userService.getenable();
  }

  // login
  @Post(`/login`)
  async getlogin(@Body() LoginDto: LoginDto): Promise<any> {
    return await this.userService.login(LoginDto);
  }

  // forgetpassword
  // @UseGuards(JwtAuthGuard)
  @Patch(`/forgetpassword`)
  async forget(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return await this.userService.updatepin(CreateUserDto);
  }

  // getaccesstoken
  @Post(`/refreshToken`)
  async getaccesstoken(@Body() CreateUserDto: { token: string }): Promise<any> {
    return await this.userService.getRefreshToken(CreateUserDto.token);
  }

  // get parking By userId
  @Post(`/getAllSlotByUserId`)
  async getslotbyuserId(
    @Body() createParkingDto: CreateParkingDto,
  ): Promise<any> {
    return await this.userService.getslotbyuserId(createParkingDto);
  }
}

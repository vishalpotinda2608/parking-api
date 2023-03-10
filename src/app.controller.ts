/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';
import { Controller } from '@nestjs/common';
import { Get, Inject } from '@nestjs/common/decorators';

@Controller()
export class AppController {

  constructor(private readonly appservice: AppService) {}
  // @Inject('auth_microservices') privateclient: ClientProxy;

  @Get()
  async getHello(): Promise<any> {
    
    return "Welcome to server"
  }
}

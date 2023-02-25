/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';
import { Controller } from '@nestjs/common';
import { Get, Inject } from '@nestjs/common/decorators';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appservice: AppService) {}
  // @Inject('auth_microservices') privateclient: ClientProxy;

  // @Get()
  // async getHello(): Promise<any> {
  //   const data = await this.privateclient.send('getregister', '');
  //   return data;
  // }
}

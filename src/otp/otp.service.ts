/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Inject, Injectable, Logger, Post } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CarOwnerDTO } from 'src/ticket/dto/create-car-owner.dto';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { HttpService } from '@nestjs/axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNumberObject } from 'util/types';
const number = require('otp-generator');

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(Neo4jService) private neo4jService: Neo4jService,
  ) {}

  // create otp
  async createOTP(mobileNo: number): Promise<any> {
    try {
      let otp = number.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      let query = await this.neo4jService.write(
        `match (n:user {mobileNo:"${mobileNo}"}) set n.otp=${otp} RETURN n`,
      );
      if (query.records.length > 0) {
        let data = JSON.stringify([
          {
            name: 'sendSms',
            opts: {
              priority: 1,
            },
            data: {
              senderid: 'TMEPAY',
              message: `Dear User,\nYour OTP (One Time Password) is ${otp} . OTP is valid for 10 mins. pls do not share with anyone. TimePay`,
              numbers: `"${mobileNo}"`,
            },
          },
        ]);
        let config = {
          method: 'post',
          url: 'https://notification-microservice.timepayx.com/bulk/sendNotification',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
        return new Promise((resolve, reject) => {
          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error);
              resolve(error);
            });
          console.log(otp);
        });
      } else {
        return 'invaild mobile number';
      }
    } catch (error) {
      return { status: false, msg: 'FAILED' };
    }
  }

  // validate-OTP
  async validateOTP(body: CreateOtpDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `match(u:user{otp:${body.otp}, mobileNo:"${body.mobileNo}"}) return u`,
      );
      if (query.records.length == 0) {
        return { status: false, msg: 'Invalid OTP' };
      } else {
        const q = await this.neo4jService.write(
          `match(u:user{otp:${body.otp}, mobileNo:"${body.mobileNo}"}) 
          set u.otp=""
          return u`,
        );
        return { status: true, msg: 'OTP Verified Succussfully' };
      }
    } catch (error) {
      return { status: false, msg: 'FAILED' };
    }
  }
}

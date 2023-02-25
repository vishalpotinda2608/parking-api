import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Neo4jService } from 'nest-neo4j/dist';
import { v4 as uuidv4 } from 'uuid';
import { CreateParkingDto } from './dto/create-Parking.dto';
import { LoginDto } from './dto/login.dto';
uuidv4();
@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @Inject(Neo4jService) private neo4jService: Neo4jService,
  ) {}

  // createuser
  async save(body: CreateUserDto): Promise<any> {
    return new Promise(async (resolve) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.pin, salt);
        const userId = uuidv4();

        const isUser = await this.neo4jService.read(
          `MATCH (u:user{mobileNo:"${body.mobileNo}"}) return u`,
        );

        if (isUser.records.length == 0) {
          const query = await this.neo4jService.write(
            `merge (u:user{userId:"${userId}",name:"${body.name}",lastName:"${body.lastName}",email:"${body.email}",mobileNo:"${body.mobileNo}",pin:"${hash}"}) return u`,
          );

          const data = query.records[0]['_fields'][0].properties;
          const obj = {
            name: data.name,
            userId: data.userId,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.mobileNo,
          };
          const token = this.jwtService.sign(obj);
          resolve({
            status: true,
            msg: 'successfully created',
            data: token,
            statusCode: 201,
          });
        } else {
          resolve({
            status: false,
            msg: 'User Already Exist!',
          });
        }
      } catch (error) {
        resolve({ status: false, msg: 'FAILED', statusCode: 400 });
      }
    });
  }

  // finduserbyid
  async find(id: CreateUserDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `match (u:user{userId:"${id.userId}"}) return u`,
      );

      if (query.records.length == 0) {
        return `invaild userid`;
      } else
        return {
          status: true,
          msg: 'SUCCESS',
          data: query.records[0].get('U')['properties'],
        };
    } catch (error) {
      return { msg: 'FAILED', status: false };
    }
  }

  // finduserbymobileno
  async finduser(body: CreateUserDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `match (u:user{mobileNo:"${body.mobileNo}"}) return u`,
      );
      if (query.records.length == 0) {
        return `invaild mobilenumber`;
      } else
        return {
          status: true,
          msg: 'SUCCESS',
          data: query.records[0].get('u')['properties'],
        };
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }

  // getalluser
  async getAll(): Promise<{
    status: boolean;
    msg: string;
    data?: CreateUserDto[];
  }> {
    try {
      const query = await this.neo4jService.read(`match (u:user) return u`);
      let user = [];
      if (query.records.length == 0) {
        return { status: false, msg: 'Users not found' };
      } else {
        query.records.forEach((el) => {
          user.push(el.get('u')['properties']);
        });
        return { status: true, msg: 'SUCESS', data: user };
      }
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }

  // updateEmail
  async updateuser(body: CreateUserDto): Promise<any> {
    try {
      const query = await this.neo4jService
        .write(`match (u:user {name:"${body.name}"})
    set u.email="${body.email}"return u`);
      if (query.records.length == 0) {
        return { msg: 'No user found' };
      } else {
        return {
          data: query.records,
          msg: 'successfully updated email',
          status: true,
        };
      }
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }

  // enableUser
  async enableuser(body: CreateUserDto): Promise<any> {
    try {
      const query = await this.neo4jService
        .write(`match (u:user{userId:"${body.userId}"})
      set u.usertype="enable"
      return u`);
      if (query.records.length == 0) {
        return { status: false, msg: `invaild userid` };
      } else {
        return { status: true, msg: `successfully enable account` };
      }
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }

  // disableUser
  async disabletype(body: CreateUserDto): Promise<any> {
    try {
      const query = await this.neo4jService
        .write(`match (u:user{userId:"${body.userId}"})
      set u.usertype="disable"
      return u`);
      if (query.records.length == 0) {
        return { status: false, msg: `invaild userid` };
      } else {
        return { status: true, msg: `successfully disable account` };
      }
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }

  // getalldisable
  async getdisable(): Promise<{
    status: boolean;
    msg: string;
    data?: CreateUserDto[];
  }> {
    try {
      const query = await this.neo4jService.read(
        `match (u:user{usertype:"disable"}) return u`,
      );
      let enable = [];

      query.records.forEach((el) => {
        enable.push(el.get('u')['properties']);
      });
      if (query.records.length == 0) {
        return { status: false, msg: 'no user will disable' };
      } else return { status: true, msg: 'SUCESS', data: enable };
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }

  // getallenable
  async getenable(): Promise<{
    status: boolean;
    msg: string;
    data?: CreateUserDto[];
  }> {
    try {
      const query = await this.neo4jService.read(
        `match (u:user{usertype:"enable"}) return u`,
      );
      let disable = [];
      query.records.forEach((el) => {
        disable.push(el.get('u')['properties']);
      });
      if (query.records.length == 0) {
        return { status: false, msg: `no user is enable` };
      } else return { status: true, msg: 'SUCESS', data: disable };
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }

  // login
  async login(body: LoginDto) {
    return new Promise((resolve) => {
      try {
        this.neo4jService
          .read(`match (u:user{mobileNo:"${body.mobileNo}"}) return u`)
          .then(async (r) => {
            const data = r.records[0]['_fields'][0].properties;
            const pin = await bcrypt.compare(body.pin, data.pin);
            if (pin) {
              const obj = {
                name: data.name,
                userId: data.userId,
                lastName: data.lastName,
                email: data.email,
                mobileNo: data.mobileNo,
                adress: data.adress,
                pinCode: data.pinCode,
                city: data.city,
                countery: data.countery,
                locality: data.locality,
                state: data.state,
              };
              const token = this.jwtService.sign(obj, { expiresIn: '15m' });
              const refreshtoken = this.jwtService.sign(
                { userId: data.userId },
                { expiresIn: '7d' },
              );
              resolve({
                accessToken: token,
                refreshToken: refreshtoken,
                status: true,
                msg: 'SUCCESS',
              });
            } else {
              resolve({
                status: false,
                msg: 'Invalid Crediential ',
              });
            }
          })
          .catch((error) => {
            resolve({
              status: false,
              msg: 'Invalid Crediential ',
            });
          });
      } catch (error) {
        resolve({
          status: false,
          msg: 'error encountered',
          data: error,
        });
      }
    });
  }

  // updatepassword
  async updatepin(body: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.pin, salt);
      const query = await this.neo4jService
        .write(`match (u:user {mobileNo: "${body.mobileNo}"})
    set u.pin="${hash}"return u`);
      if (query.records.length == 0)
        return { msg: 'invaild mobile number', status: false };
      else return { status: true, msg: 'SUCCESSFULLY CHANGED PASSWORD' };
    } catch (error) {
      return { statusCode: 500, status: false, msg: 'FAILED' };
    }
  }

  // saveparkingdetail

  async getRefreshToken(data: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const body: any = this.jwtService.decode(data);
        this.neo4jService
          .read(`match (u:user{userId:"${body.userId}"}) return u`)
          .then(async (res) => {
            const token = res.records[0].get(`u`)[`properties`];
            const obj = {
              name: token.name,
              userId: token.userId,
              lastName: token.lastName,
              email: token.email,
              mobileNo: token.mobileNo,
            };
            const access_token = await this.jwtService.sign(obj, {
              expiresIn: '15m',
            });
            const refreshToken = await this.jwtService.sign({
              userId: token.userId,
            });
            resolve({ refreshToken: refreshToken, accessToken: access_token });
          });
      } catch (error) {
        console.log(error);
        resolve({ status: false, error: error });
      }
    });
  }

  async getslotbyuserId(data: CreateParkingDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `match (u:parking {userId:"${data.userId}"}) return u`,
      );
      let slots = [];
      query.records.forEach((el) => {
        slots.push(el.get('u')['properties']);
      });

      if (query.records.length == 0)
        return { status: false, msg: `parking not found` };
      else {
        {
          return { data: slots, msg: 'SUCESS', status: true };
        }
      }
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }
}

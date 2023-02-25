"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const dist_1 = require("nest-neo4j/dist");
const uuid_1 = require("uuid");
(0, uuid_1.v4)();
let UserService = class UserService {
    constructor(jwtService, neo4jService) {
        this.jwtService = jwtService;
        this.neo4jService = neo4jService;
    }
    async save(body) {
        return new Promise(async (resolve) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(body.pin, salt);
                const userId = (0, uuid_1.v4)();
                const isUser = await this.neo4jService.read(`MATCH (u:user{mobileNo:"${body.mobileNo}"}) return u`);
                if (isUser.records.length == 0) {
                    const query = await this.neo4jService.write(`merge (u:user{userId:"${userId}",name:"${body.name}",lastName:"${body.lastName}",email:"${body.email}",mobileNo:"${body.mobileNo}",pin:"${hash}"}) return u`);
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
                }
                else {
                    resolve({
                        status: false,
                        msg: 'User Already Exist!',
                    });
                }
            }
            catch (error) {
                resolve({ status: false, msg: 'FAILED', statusCode: 400 });
            }
        });
    }
    async find(id) {
        try {
            const query = await this.neo4jService.read(`match (u:user{userId:"${id.userId}"}) return u`);
            if (query.records.length == 0) {
                return `invaild userid`;
            }
            else
                return {
                    status: true,
                    msg: 'SUCCESS',
                    data: query.records[0].get('U')['properties'],
                };
        }
        catch (error) {
            return { msg: 'FAILED', status: false };
        }
    }
    async finduser(body) {
        try {
            const query = await this.neo4jService.read(`match (u:user{mobileNo:"${body.mobileNo}"}) return u`);
            if (query.records.length == 0) {
                return `invaild mobilenumber`;
            }
            else
                return {
                    status: true,
                    msg: 'SUCCESS',
                    data: query.records[0].get('u')['properties'],
                };
        }
        catch (error) {
            return { msg: 'faild', status: false };
        }
    }
    async getAll() {
        try {
            const query = await this.neo4jService.read(`match (u:user) return u`);
            let user = [];
            if (query.records.length == 0) {
                return { status: false, msg: 'Users not found' };
            }
            else {
                query.records.forEach((el) => {
                    user.push(el.get('u')['properties']);
                });
                return { status: true, msg: 'SUCESS', data: user };
            }
        }
        catch (error) {
            return { status: false, msg: 'faild' };
        }
    }
    async updateuser(body) {
        try {
            const query = await this.neo4jService
                .write(`match (u:user {name:"${body.name}"})
    set u.email="${body.email}"return u`);
            if (query.records.length == 0) {
                return { msg: 'No user found' };
            }
            else {
                return {
                    data: query.records,
                    msg: 'successfully updated email',
                    status: true,
                };
            }
        }
        catch (error) {
            return { status: false, msg: 'faild' };
        }
    }
    async enableuser(body) {
        try {
            const query = await this.neo4jService
                .write(`match (u:user{userId:"${body.userId}"})
      set u.usertype="enable"
      return u`);
            if (query.records.length == 0) {
                return { status: false, msg: `invaild userid` };
            }
            else {
                return { status: true, msg: `successfully enable account` };
            }
        }
        catch (error) {
            return { msg: 'faild', status: false };
        }
    }
    async disabletype(body) {
        try {
            const query = await this.neo4jService
                .write(`match (u:user{userId:"${body.userId}"})
      set u.usertype="disable"
      return u`);
            if (query.records.length == 0) {
                return { status: false, msg: `invaild userid` };
            }
            else {
                return { status: true, msg: `successfully disable account` };
            }
        }
        catch (error) {
            return { status: false, msg: 'faild' };
        }
    }
    async getdisable() {
        try {
            const query = await this.neo4jService.read(`match (u:user{usertype:"disable"}) return u`);
            let enable = [];
            query.records.forEach((el) => {
                enable.push(el.get('u')['properties']);
            });
            if (query.records.length == 0) {
                return { status: false, msg: 'no user will disable' };
            }
            else
                return { status: true, msg: 'SUCESS', data: enable };
        }
        catch (error) {
            return { status: false, msg: 'faild' };
        }
    }
    async getenable() {
        try {
            const query = await this.neo4jService.read(`match (u:user{usertype:"enable"}) return u`);
            let disable = [];
            query.records.forEach((el) => {
                disable.push(el.get('u')['properties']);
            });
            if (query.records.length == 0) {
                return { status: false, msg: `no user is enable` };
            }
            else
                return { status: true, msg: 'SUCESS', data: disable };
        }
        catch (error) {
            return { msg: 'faild', status: false };
        }
    }
    async login(body) {
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
                        const refreshtoken = this.jwtService.sign({ userId: data.userId }, { expiresIn: '7d' });
                        resolve({
                            accessToken: token,
                            refreshToken: refreshtoken,
                            status: true,
                            msg: 'SUCCESS',
                        });
                    }
                    else {
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
            }
            catch (error) {
                resolve({
                    status: false,
                    msg: 'error encountered',
                    data: error,
                });
            }
        });
    }
    async updatepin(body) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(body.pin, salt);
            const query = await this.neo4jService
                .write(`match (u:user {mobileNo: "${body.mobileNo}"})
    set u.pin="${hash}"return u`);
            if (query.records.length == 0)
                return { msg: 'invaild mobile number', status: false };
            else
                return { status: true, msg: 'SUCCESSFULLY CHANGED PASSWORD' };
        }
        catch (error) {
            return { statusCode: 500, status: false, msg: 'FAILED' };
        }
    }
    async getRefreshToken(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const body = this.jwtService.decode(data);
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
            }
            catch (error) {
                console.log(error);
                resolve({ status: false, error: error });
            }
        });
    }
    async getslotbyuserId(data) {
        try {
            const query = await this.neo4jService.read(`match (u:parking {userId:"${data.userId}"}) return u`);
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
        }
        catch (error) {
            return { status: false, msg: 'faild' };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(dist_1.Neo4jService)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        dist_1.Neo4jService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
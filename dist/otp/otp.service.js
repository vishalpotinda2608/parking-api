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
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const dist_1 = require("nest-neo4j/dist");
const axios_2 = require("@nestjs/axios");
const number = require('otp-generator');
let OtpService = OtpService_1 = class OtpService {
    constructor(httpService, neo4jService) {
        this.httpService = httpService;
        this.neo4jService = neo4jService;
        this.logger = new common_1.Logger(OtpService_1.name);
    }
    async createOTP(mobileNo) {
        try {
            let otp = number.generate(4, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            let query = await this.neo4jService.write(`match (n:user {mobileNo:"${mobileNo}"}) set n.otp=${otp} RETURN n`);
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
                    (0, axios_1.default)(config)
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
            }
            else {
                return 'invaild mobile number';
            }
        }
        catch (error) {
            return { status: false, msg: 'FAILED' };
        }
    }
    async validateOTP(body) {
        try {
            const query = await this.neo4jService.read(`match(u:user{otp:${body.otp}, mobileNo:"${body.mobileNo}"}) return u`);
            if (query.records.length == 0) {
                return { status: false, msg: 'Invalid OTP' };
            }
            else {
                const q = await this.neo4jService.write(`match(u:user{otp:${body.otp}, mobileNo:"${body.mobileNo}"}) 
          set u.otp=""
          return u`);
                return { status: true, msg: 'OTP Verified Succussfully' };
            }
        }
        catch (error) {
            return { status: false, msg: 'FAILED' };
        }
    }
};
OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(dist_1.Neo4jService)),
    __metadata("design:paramtypes", [axios_2.HttpService,
        dist_1.Neo4jService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map
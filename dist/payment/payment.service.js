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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("nest-neo4j/dist");
const number = require('otp-generator');
let PaymentService = class PaymentService {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
    }
    async createpayment(body) {
        const custRefNo = number.generate(12, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        const date = new Date();
        return new Promise(async (resolve) => {
            try {
                this.neo4jService
                    .write(`merge (p:Payment{userId: "${body.userId}",CustomerName:"${body.CustomerName}",respMessage:"${body.respMessage}",TnxId:"${body.TnxId}",txnTime:"${date}",amount:"${body.amount}",upild:"${body.upiId} || ''",extTransactionId:"${body.extTransactionId} || ''",custRefNo:"${custRefNo}|| ''",remark:"${body.remark}", collectAmount:"${body.collectAmount}", type:"${body.type}", ticketId:"${body.ticketId}"}) return p`)
                    .then(() => {
                    this.neo4jService
                        .write(`match (p:Payment {ticketId: "${body.ticketId}"}),(c:CarOwner {ticketId: "${body.ticketId}"})
                merge (p)-[r:has_Payment]->(c)
                return p,c,r`)
                        .then((res) => {
                        resolve({
                            status: true,
                            msg: 'PAYMENT SUCCESSFULL',
                            data: res.records[0],
                            statusCode: 200,
                        });
                    })
                        .catch(() => {
                        resolve({ status: false, msg: 'Enter vaild information' });
                    });
                })
                    .catch(() => {
                    resolve({ status: false, msg: 'Cant find any payment in User' });
                });
            }
            catch (error) {
                resolve({ status: false, msg: 'PAYMENT FAILED' });
            }
        });
    }
    async findAllPayment(body) {
        try {
            let payments = [];
            let query = await this.neo4jService.read(`MATCH (c:Payment{userId: "${body.userId}"}) RETURN c`);
            query.records.forEach((e) => {
                payments.push(e.get('c')['properties']);
            });
            return { status: true, msg: 'SUCCESS', data: payments };
        }
        catch (error) {
            return {
                msg: 'Can not find any Payment in the current User',
                status: false,
            };
        }
    }
    async paymentbytxnId(body) {
        try {
            const query = await this.neo4jService.read(`MATCH (c:Payment{upiTxId: "${body.TnxId}"}) RETURN c`);
            let txnId = [];
            query.records.forEach((el) => {
                txnId.push(el.get('c')['properties']);
            });
            if (query.records.length == 0) {
                return { status: false, msg: `No UPI transaction will found` };
            }
            else
                return { status: true, msg: 'SUCESS', data: txnId };
        }
        catch (error) {
            return { msg: 'faild', status: false };
        }
    }
    async paymentByType(body) {
        try {
            const query = await this.neo4jService.read(`MATCH (c:Payment{type: "${body.type}"}) RETURN c`);
            let cash = [];
            query.records.forEach((el) => {
                cash.push(el.get('c')['properties']);
            });
            if (query.records.length == 0) {
                return { status: false, msg: `No transaction will found` };
            }
            else
                return { status: true, msg: 'SUCESS', data: cash };
        }
        catch (error) {
            return { msg: 'faild', status: false };
        }
    }
    async cashpayment(body) {
        try {
            const query = await this.neo4jService.read(`MATCH (c:Payment{custRefNo: "${body.custRefNo}",type: "cash" }) RETURN c`);
            let txnId = [];
            query.records.forEach((el) => {
                txnId.push(el.get('c')['properties']);
            });
            if (query.records.length == 0) {
                return { status: false, msg: `No cash transaction will found` };
            }
            else
                return { status: true, msg: 'SUCESS', data: txnId };
        }
        catch (error) {
            return { msg: 'faild', status: false };
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.Neo4jService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map
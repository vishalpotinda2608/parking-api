import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Neo4jService } from 'nest-neo4j/dist';
const number = require('otp-generator');
@Injectable()
export class PaymentService {
  constructor(private neo4jService: Neo4jService) {}

  // createpayment
  async createpayment(body: CreatePaymentDto): Promise<any> {
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
          .write(
            `merge (p:Payment{userId: "${body.userId}",CustomerName:"${body.CustomerName}",respMessage:"${body.respMessage}",TnxId:"${body.TnxId}",txnTime:"${date}",amount:"${body.amount}",upild:"${body.upiId} || ''",extTransactionId:"${body.extTransactionId} || ''",custRefNo:"${custRefNo}|| ''",remark:"${body.remark}", collectAmount:"${body.collectAmount}", type:"${body.type}", ticketId:"${body.ticketId}"}) return p`,
          )
          .then(() => {
            this.neo4jService
              .write(
                `match (p:Payment {ticketId: "${body.ticketId}"}),(c:CarOwner {ticketId: "${body.ticketId}"})
                merge (p)-[r:has_Payment]->(c)
                return p,c,r`,
              )
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
      } catch (error) {
        resolve({ status: false, msg: 'PAYMENT FAILED' });
      }
    });
  }

  // findallpayment
  async findAllPayment(body: CreatePaymentDto): Promise<any> {
    try {
      let payments = [];
      let query = await this.neo4jService.read(
        `MATCH (c:Payment{userId: "${body.userId}"}) RETURN c`,
      );
      query.records.forEach((e) => {
        payments.push(e.get('c')['properties']);
      });
      return { status: true, msg: 'SUCCESS', data: payments };
    } catch (error) {
      return {
        msg: 'Can not find any Payment in the current User',
        status: false,
      };
    }
  }

  // paymentbytxnid
  async paymentbytxnId(body: CreatePaymentDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `MATCH (c:Payment{upiTxId: "${body.TnxId}"}) RETURN c`,
      );
      let txnId = [];
      query.records.forEach((el) => {
        txnId.push(el.get('c')['properties']);
      });
      if (query.records.length == 0) {
        return { status: false, msg: `No UPI transaction will found` };
      } else return { status: true, msg: 'SUCESS', data: txnId };
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }

  // find payments by its type
  async paymentByType(body: CreatePaymentDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `MATCH (c:Payment{type: "${body.type}"}) RETURN c`,
      );
      let cash = [];
      query.records.forEach((el) => {
        cash.push(el.get('c')['properties']);
      });
      if (query.records.length == 0) {
        return { status: false, msg: `No transaction will found` };
      } else return { status: true, msg: 'SUCESS', data: cash };
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }

  // find a cash payment
  async cashpayment(body: CreatePaymentDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `MATCH (c:Payment{custRefNo: "${body.custRefNo}",type: "cash" }) RETURN c`,
      );
      let txnId = [];
      query.records.forEach((el) => {
        txnId.push(el.get('c')['properties']);
      });
      if (query.records.length == 0) {
        return { status: false, msg: `No cash transaction will found` };
      } else return { status: true, msg: 'SUCESS', data: txnId };
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }
}

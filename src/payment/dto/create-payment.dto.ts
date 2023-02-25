/* eslint-disable prettier/prettier */
export class CreatePaymentDto {
  //cash
  userId: string;
  ticketId: string;
  CustomerName: string;
  respMessage: string;
  TnxId: string;
  txnTime: Date;
  amount: number;
  remark: string;
  collectAmount?: number;
  type: PAYMENT_TYPE;

  extTransactionId?: string;
  upiId?: string;
  custRefNo?: number;
}
export enum PAYMENT_TYPE {
  'QR' = 'QR',
  'CASH' = 'CASH',
  'UPI' = 'UPI',
}

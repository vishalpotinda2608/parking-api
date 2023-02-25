export declare class CreatePaymentDto {
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
export declare enum PAYMENT_TYPE {
    'QR' = "QR",
    'CASH' = "CASH",
    'UPI' = "UPI"
}

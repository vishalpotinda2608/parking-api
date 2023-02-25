import { CreatePaymentDto } from './dto/create-payment.dto';
import { Neo4jService } from 'nest-neo4j/dist';
export declare class PaymentService {
    private neo4jService;
    constructor(neo4jService: Neo4jService);
    createpayment(body: CreatePaymentDto): Promise<any>;
    findAllPayment(body: CreatePaymentDto): Promise<any>;
    paymentbytxnId(body: CreatePaymentDto): Promise<any>;
    paymentByType(body: CreatePaymentDto): Promise<any>;
    cashpayment(body: CreatePaymentDto): Promise<any>;
}

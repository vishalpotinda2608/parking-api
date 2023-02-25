import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<any>;
    findall(createPaymentDto: CreatePaymentDto): Promise<any>;
    findbytxnId(createPaymentDto: CreatePaymentDto): Promise<any>;
    paymentByType(createPaymentDto: CreatePaymentDto): Promise<any>;
    cashpayment(createPaymentDto: CreatePaymentDto): Promise<any>;
}

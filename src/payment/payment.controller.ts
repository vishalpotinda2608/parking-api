import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('payment')
// @UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // make payment
  @Post(`/makepayment`)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createpayment(createPaymentDto);
  }

  // find all payment
  @Post(`/getallpayment`)
  findall(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.findAllPayment(createPaymentDto);
  }

  // find payment by txnId
  @Post(`/paymentbytxnId`)
  findbytxnId(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.paymentbytxnId(createPaymentDto);
  }

  @Post(`/GetAllPaymentByType`)
  paymentByType(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.paymentByType(createPaymentDto);
  }

  @Post(`/GetCashPayment`)
  cashpayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.cashpayment(createPaymentDto);
  }
}

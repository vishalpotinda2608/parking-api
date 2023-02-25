import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CarOwnerDTO } from './dto/create-car-owner.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('ticket')
// @UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // create ticket
  @Post(`/createcarowner`)
  async usercreated(@Body() CarOwnerDTO: CarOwnerDTO) {
    return this.ticketService.save(CarOwnerDTO);
  }

  // find ticket by id
  @Post(`/ticketbyId`)
  async ticketbyId(@Body() createticketdto: CreateTicketDto) {
    return this.ticketService.ticketById(createticketdto);
  }

  //  finduserparkingdetilas
  @Post(`/getTicketByUserId`)
  async UserallparkingDetails(
    @Body() createticketdto: CreateTicketDto,
  ): Promise<any> {
    return this.ticketService.getTicketByUserId(createticketdto);
  }

  // get ticket details by userId
  @Post(`/GetAllCar`)
  async ticketByMobileNO(
    @Body() createticketdto: CreateTicketDto,
  ): Promise<any> {
    return this.ticketService.ticketByCarNO(createticketdto);
  }
}

import { TicketService } from './ticket.service';
import { CarOwnerDTO } from './dto/create-car-owner.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    usercreated(CarOwnerDTO: CarOwnerDTO): Promise<any>;
    ticketbyId(createticketdto: CreateTicketDto): Promise<any>;
    UserallparkingDetails(createticketdto: CreateTicketDto): Promise<any>;
    ticketByMobileNO(createticketdto: CreateTicketDto): Promise<any>;
}

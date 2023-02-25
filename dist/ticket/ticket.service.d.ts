import { JwtService } from '@nestjs/jwt';
import { Neo4jService } from 'nest-neo4j/dist';
import { CarOwnerDTO } from './dto/create-car-owner.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
export declare class TicketService {
    private jwtService;
    private neo4jService;
    constructor(jwtService: JwtService, neo4jService: Neo4jService);
    save(body: CarOwnerDTO): Promise<any>;
    ticketById(body: CreateTicketDto): Promise<any>;
    getTicketByUserId(body: CreateTicketDto): Promise<any>;
    ticketByCarNO(body: CreateTicketDto): Promise<any>;
}

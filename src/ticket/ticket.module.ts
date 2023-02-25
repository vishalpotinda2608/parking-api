import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[   JwtModule.register({
    secretOrPrivateKey: 'secret12356789',
  })],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}

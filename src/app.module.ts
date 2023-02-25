import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { Neo4jModule } from 'nest-neo4j/dist';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { OtpModule } from './otp/otp.module';
import { PaymentModule } from './payment/payment.module';
import { ReportModule } from './report/report.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  // clientsmodule for microservices
  imports: [
    ClientsModule.register([
      {
        name: 'auth_microservices',
        transport: Transport.TCP,
        options: {
          port: 3010,
        },
      },
    ]),

    // Neo4jModule for database
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: 'b76e3d84.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 'kH8WQkwu-vK5bmjUYjJ2oe1kbcBeoZdDeErj9o8woSk',
    }),

    // allmodule Connection
    UserModule,
    TicketModule,
    OtpModule,
    PaymentModule,
    ReportModule,
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Neo4jService } from 'nest-neo4j/dist';
import { CarOwnerDTO } from './dto/create-car-owner.dto';
import { v1 as uuidv1 } from 'uuid';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    private jwtService: JwtService,
    @Inject(Neo4jService) private neo4jService: Neo4jService,
  ) {}

  // create ticket
  async save(body: CarOwnerDTO): Promise<any> {
    const v1options = {
      node: [0x01, 0x23, 0x45, 0x67],
      clockseq: 0x1234,
      msecs: new Date().getTime(),
      nsecs: 5678,
    };
    const barcodeNo = uuidv1();
    const ticketID = uuidv1();
    uuidv1(v1options);
    const startDate = new Date(body.startDate).getTime();
    console.log(`1 okk`, startDate);
    const endDate = new Date(body.endDate).getTime();
    console.log(`2 okk`, endDate);
    const totalTime: any = endDate - startDate;
    console.log(`3 okk`, totalTime);
    const totaldate: any = totalTime / (1000 * 3600 * 24);
    console.log(totaldate);
    const rate: number = 20 * totaldate;
    console.log(rate, `4 okk`);

    const ticketNo = Math.floor(Math.random() * 1000000000);

    return new Promise(async (resolve, reject) => {
      this.neo4jService
        .read(`MATCH (c:CarOwner) WHERE c.carNo="${body.carNo}" return c`)
        .then((res) => {
          if (res.records.length == 0) {
            this.neo4jService
              .write(
                `merge(c:CarOwner {firstName :"${body.firstName}",lastName :"${body.lastName}",mobileNo:"${body.mobileNo}",inTime:"${body.inTime}",outTime:"${body.outTime}",barcodeNo: "${barcodeNo}",serialNO:" ${ticketNo}", ticketId:"${ticketID}",subSlotId: "${body.subSlotId}",paymentType:"${body.paymentType}",startDate:"${body.startDate}",endDate:"${body.endDate}",value:"${rate}",userId:"${body.userId}"})-[h:has_Vehicle]-(v:Vehicle {carNo:"${body.carNo}",vehicleType:"${body.vehicleType}",ticketId:"${ticketID}",subSlotId: "${body.subSlotId}",userId:"${body.userId}"}) return c,v`,
              )
              .then((r) => {
                this.neo4jService
                  .write(
                    `
              MATCH (s:subSlot),(c:CarOwner) WHERE s.subSlotId="${body.subSlotId}" AND c.ticketId="${ticketID}"
              MERGE (s)-[r:HAS_PARKING]->(c)
              set s.type="occupied"
              return r,c,s
              `,
                  )

                  .then((re: any) => {
                    resolve({
                      status: true,
                      msg: 'successfully created ticket',
                      data: re.records[0].get('c')['properties'],
                      statusCode: 201,
                    });
                  });
              });
          } else {
            resolve({
              status: false,
              msg: 'Already register with current CarDetail',
            });
          }
        });
    });
  }

  // find ticket by id
  async ticketById(body: CreateTicketDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `MATCH (c:CarOwner{serialNO: ${body.serialNO}}) RETURN c`,
      );
      if (query.records.length == 0)
        return { status: false, msg: `ticket not found` };
      else {
        {
          return {
            data: query.records[0].get('c')['properties'],
            status: true,
            msg: 'Ticket found successfully',
          };
        }
      }
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }

  // finduserparkingdetilas
  async getTicketByUserId(body: CreateTicketDto): Promise<any> {
    try {
      const query = await this.neo4jService.read(
        `match (c:CarOwner {userId: "${body.userId}"}),(v:Vehicle {userId: "${body.userId}"}) return c,v`,
      );
      if (query.records.length == 0) {
        return { status: false, msg: 'USER NOT FOUND' };
      } else {
        let parkings = [];
        query.records.forEach((el) => {
          if (
            parkings.find(
              (p) =>
                p.serialNO == el.get('c')['properties'].serialNO ||
                p.carNo == el.get('v')['properties'].carNo,
            )
          ) {
            console.log('Duplicate Found');
          } else {
            console.log(el.get('v')['properties']);

            parkings.push({
              ...el.get('c')['properties'],
              ...el.get('v')['properties'],
            });
          }
        });

        return { status: true, msg: 'SUCESS', data: parkings };
      }
    } catch (error) {
      return { msg: 'faild', status: false };
    }
  }

  async ticketByCarNO(body: CreateTicketDto): Promise<any> {
    try {
      const query = await this.neo4jService
        .read(`MATCH (n:CarOwner {userId: "${body.userId}"}),(v:Vehicle {carNo:"${body.carNo}"}) 
      RETURN n,v `);
      if (query.records.length == 0)
        return { status: false, msg: 'No Ticket Genrated' };
      else {
        let tickets = [];
        query.records.forEach((el) => {
          const { firstName, lastName, mobileNo } = el.get('n')['properties'];
          const { vehicleType, carNo } = el.get('v')['properties'];
          tickets.push({
            firstName,
            lastName,
            vehicleType,
            mobileNo,
            carNo,
          });
        });
        return {
          status: true,
          msg: 'SUCCESS',
          data: [
            {
              firstName: query.records[0].get('n')['properties'].firstName,
              lastName: query.records[0].get('n')['properties'].lastName,
              mobileNo: query.records[0].get('n')['properties'].mobileNo,
              carNo: query.records[0].get('v')['properties'].carNo,
              vehicleType: query.records[0].get('v')['properties'].vehicleType,
            },
          ],
        };
      }
    } catch (error) {
      return { status: false, msg: 'faild' };
    }
  }
}

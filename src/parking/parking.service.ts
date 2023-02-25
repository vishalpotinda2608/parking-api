import { Inject, Injectable } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ParkingService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}

  // createparking
  async saveParking(body: CreateParkingDto): Promise<any> {
    const parkingId = uuidv4();
    return new Promise(async (resolve) => {
      try {
        this.neo4jService
          .write(
            `merge (p:parking{name:"${body.name}",address:"${body.address}",pinCode:"${body.pinCode}",locality:"${body.locality}",city:"${body.city}",state:"${body.state}",paymentType:"${body.paymentType}",parkingSlotType:"${body.parkingSlotType}",startNo:"${body.startNo}",endNo:"${body.endNo}",collectionType:"${body.collectionType}",bankAccountDetails:"${body.bankAccountDetails}",userId:"${body.userId}",parkingId:"${parkingId}"}) return p`,
          )
          .then(() => {
            this.neo4jService
              .write(
                `MATCH (u:user {userId:"${body.userId}"}),(p:parking {userId:"${body.userId}"})MERGE (u)-[r:Owner]->(p)return u,p`,
              )

              .then((res) => {
                resolve({ status: true, msg: 'SUCCESS', statusCode: 201 });
              })
              .catch(() => {
                resolve({ status: false, msg: 'Enter vaild information' });
              });
          })
          .catch(() => {
            resolve({ status: false, msg: 'Cant find any User & Parking' });
          });
      } catch (error) {
        resolve({ status: false, msg: 'FAILED to genrate response' });
      }
    });
  }

  // getall slot with subslot
  async getAllvecant(body: CreateParkingDto): Promise<any> {
    return new Promise(async (resolve) => {
      try {
        await this.neo4jService
          .read(
            // `match(u:slot {userId:"${body.userId}"}),(v:subSlot{userId: "${body.userId}"}) return u,v `,
            `match (u:slot{userId:"${body.userId}"}) RETURN  u
              union
            match (u:subSlot{userId: "${body.userId}"})  return  u        `,
          )
          .then((res) => {
            let subSlot = [];
            let slot = [];
            for (let i = 0; i < res.records.length; i++) {
              if (res.records[i].get('u')['labels'][0] == 'slot') {
                slot.push(res.records[i].get('u')['properties']);
              } else {
                subSlot.push(res.records[i].get('u')['properties']);
              }
            }
            console.log(slot);
            console.log(subSlot);

            return { slot, subSlot };
          })
          .then((r) => {
            let combine = [];
            for (let slot of r.slot) {
              const subSlot = r.subSlot.filter(
                (res) => res.slotId == slot.slotId,
              );
              combine.push({ ...slot, subslot: subSlot });
            }
            console.log(combine);

            resolve({
              status: true,
              msg: 'SUCCESS',
              data: combine,
            });
          })
          .catch((error) => {
            resolve({
              status: false,
              msg: 'Cant find any parking slots in current user',
              data: null,
            });
          });
      } catch (error) {
        resolve({
          status: false,
          msg: 'Somthing wents wrong',
          data: null,
        });
      }
    });
  }

  // create slot
  async saveParkingZone(body: CreateParkingDto): Promise<any> {
    const slotId = uuidv4();
    return new Promise(async (resolve) => {
      try {
        this.neo4jService
          .write(
            `merge(s:slot{slotId:"${slotId}",slotName:"${body.slotName}",parkingId: "${body.parkingId}",userId:"${body.userId}"})return s`,
          )
          .then(() => {
            this.neo4jService
              .write(
                `match (p:parking {parkingId: "${body.parkingId}"}),(s:slot {slotId:"${slotId}"})MERGE (p)-[r:parking_Slot]->(s)return s,p,r`,
              )

              .then((res) => {
                resolve({ status: true, msg: 'SUCCESS', statusCode: 201 });
              })
              .catch(() => {
                resolve({ status: false, msg: 'Enter vaild information' });
              });
          })
          .catch(() => {
            resolve({
              status: false,
              msg: 'Cant find parking for current User',
            });
          });
      } catch (error) {
        resolve({ status: false, msg: 'FAILED' });
      }
    });
  }

  // create subslot
  async saveSlot(body: CreateParkingDto): Promise<any> {
    const sub_slotId = uuidv4();
    return new Promise(async (resolve) => {
      try {
        const subslot = await this.neo4jService.read(
          `match (s:subSlot{subSlotName: "${body.subSlotName}",slotId: "${body.slotId}"}) return s`,
        );
        if (subslot.records.length !== 0) {
          resolve({ status: false, msg: 'subslot name already exist' });
          console.log(subslot);
        } else {
          this.neo4jService
            .write(
              `merge(s:subSlot{subSlotId:"${sub_slotId}",subSlotName:"${body.subSlotName}",slotId: "${body.slotId}",type:"available",parkingId: "${body.parkingId}",userId:"${body.userId}",rate:"${body.rate}"})return s`,
            )
            .then(() => {
              this.neo4jService
                .write(
                  `match (p:slot {slotId: "${body.slotId}"}),(s:subSlot {subSlotId:"${sub_slotId}"})MERGE (p)-[r:parkingSubSlot]->(s)return s,p,r`,
                )

                .then((res) => {
                  resolve({ status: true, msg: 'SUCCESS', statusCode: 201 });
                })
                .catch(() => {
                  resolve({ status: false, msg: 'Enter vaild information' });
                });
            })
            .catch(() => {
              resolve({
                status: false,
                msg: 'Cant find any parking slot in current User',
              });
            });
        }
      } catch (error) {
        resolve({ status: false, msg: 'FAILED' });
      }
    });
  }
}

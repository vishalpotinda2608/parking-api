"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("nest-neo4j/dist");
const uuid_1 = require("uuid");
let ParkingService = class ParkingService {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
    }
    async saveParking(body) {
        const parkingId = (0, uuid_1.v4)();
        return new Promise(async (resolve) => {
            try {
                this.neo4jService
                    .write(`merge (p:parking{name:"${body.name}",address:"${body.address}",pinCode:"${body.pinCode}",locality:"${body.locality}",city:"${body.city}",state:"${body.state}",paymentType:"${body.paymentType}",parkingSlotType:"${body.parkingSlotType}",startNo:"${body.startNo}",endNo:"${body.endNo}",collectionType:"${body.collectionType}",bankAccountDetails:"${body.bankAccountDetails}",userId:"${body.userId}",parkingId:"${parkingId}"}) return p`)
                    .then(() => {
                    this.neo4jService
                        .write(`MATCH (u:user {userId:"${body.userId}"}),(p:parking {userId:"${body.userId}"})MERGE (u)-[r:Owner]->(p)return u,p`)
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
            }
            catch (error) {
                resolve({ status: false, msg: 'FAILED to genrate response' });
            }
        });
    }
    async getAllvecant(body) {
        return new Promise(async (resolve) => {
            try {
                await this.neo4jService
                    .read(`match (u:slot{userId:"${body.userId}"}) RETURN  u
              union
            match (u:subSlot{userId: "${body.userId}"})  return  u        `)
                    .then((res) => {
                    let subSlot = [];
                    let slot = [];
                    for (let i = 0; i < res.records.length; i++) {
                        if (res.records[i].get('u')['labels'][0] == 'slot') {
                            slot.push(res.records[i].get('u')['properties']);
                        }
                        else {
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
                        const subSlot = r.subSlot.filter((res) => res.slotId == slot.slotId);
                        combine.push(Object.assign(Object.assign({}, slot), { subslot: subSlot }));
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
            }
            catch (error) {
                resolve({
                    status: false,
                    msg: 'Somthing wents wrong',
                    data: null,
                });
            }
        });
    }
    async saveParkingZone(body) {
        const slotId = (0, uuid_1.v4)();
        return new Promise(async (resolve) => {
            try {
                this.neo4jService
                    .write(`merge(s:slot{slotId:"${slotId}",slotName:"${body.slotName}",parkingId: "${body.parkingId}",userId:"${body.userId}"})return s`)
                    .then(() => {
                    this.neo4jService
                        .write(`match (p:parking {parkingId: "${body.parkingId}"}),(s:slot {slotId:"${slotId}"})MERGE (p)-[r:parking_Slot]->(s)return s,p,r`)
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
            }
            catch (error) {
                resolve({ status: false, msg: 'FAILED' });
            }
        });
    }
    async saveSlot(body) {
        const sub_slotId = (0, uuid_1.v4)();
        return new Promise(async (resolve) => {
            try {
                const subslot = await this.neo4jService.read(`match (s:subSlot{subSlotName: "${body.subSlotName}",slotId: "${body.slotId}"}) return s`);
                if (subslot.records.length !== 0) {
                    resolve({ status: false, msg: 'subslot name already exist' });
                    console.log(subslot);
                }
                else {
                    this.neo4jService
                        .write(`merge(s:subSlot{subSlotId:"${sub_slotId}",subSlotName:"${body.subSlotName}",slotId: "${body.slotId}",type:"available",parkingId: "${body.parkingId}",userId:"${body.userId}",rate:"${body.rate}"})return s`)
                        .then(() => {
                        this.neo4jService
                            .write(`match (p:slot {slotId: "${body.slotId}"}),(s:subSlot {subSlotId:"${sub_slotId}"})MERGE (p)-[r:parkingSubSlot]->(s)return s,p,r`)
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
            }
            catch (error) {
                resolve({ status: false, msg: 'FAILED' });
            }
        });
    }
};
ParkingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(dist_1.Neo4jService)),
    __metadata("design:paramtypes", [dist_1.Neo4jService])
], ParkingService);
exports.ParkingService = ParkingService;
//# sourceMappingURL=parking.service.js.map
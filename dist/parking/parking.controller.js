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
exports.ParkingController = void 0;
const common_1 = require("@nestjs/common");
const parking_service_1 = require("./parking.service");
const create_parking_dto_1 = require("./dto/create-parking.dto");
let ParkingController = class ParkingController {
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    async saveParking(createParkingDto) {
        return await this.parkingService.saveParking(createParkingDto);
    }
    async getAllvacant(createParkingDto) {
        return await this.parkingService.getAllvecant(createParkingDto);
    }
    async saveParkingZone(createParkingDto) {
        return await this.parkingService.saveParkingZone(createParkingDto);
    }
    async saveSlot(createParkingDto) {
        return await this.parkingService.saveSlot(createParkingDto);
    }
};
__decorate([
    (0, common_1.Post)('/saveParking'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "saveParking", null);
__decorate([
    (0, common_1.Post)('/getAllvacant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "getAllvacant", null);
__decorate([
    (0, common_1.Post)('/saveParkingZone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "saveParkingZone", null);
__decorate([
    (0, common_1.Post)('/saveSlot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "saveSlot", null);
ParkingController = __decorate([
    (0, common_1.Controller)('parking'),
    __metadata("design:paramtypes", [parking_service_1.ParkingService])
], ParkingController);
exports.ParkingController = ParkingController;
//# sourceMappingURL=parking.controller.js.map
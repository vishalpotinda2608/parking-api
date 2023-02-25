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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const create_car_owner_dto_1 = require("./dto/create-car-owner.dto");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async usercreated(CarOwnerDTO) {
        return this.ticketService.save(CarOwnerDTO);
    }
    async ticketbyId(createticketdto) {
        return this.ticketService.ticketById(createticketdto);
    }
    async UserallparkingDetails(createticketdto) {
        return this.ticketService.getTicketByUserId(createticketdto);
    }
    async ticketByMobileNO(createticketdto) {
        return this.ticketService.ticketByCarNO(createticketdto);
    }
};
__decorate([
    (0, common_1.Post)(`/createcarowner`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_owner_dto_1.CarOwnerDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "usercreated", null);
__decorate([
    (0, common_1.Post)(`/ticketbyId`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "ticketbyId", null);
__decorate([
    (0, common_1.Post)(`/getTicketByUserId`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "UserallparkingDetails", null);
__decorate([
    (0, common_1.Post)(`/GetAllCar`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "ticketByMobileNO", null);
TicketController = __decorate([
    (0, common_1.Controller)('ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map
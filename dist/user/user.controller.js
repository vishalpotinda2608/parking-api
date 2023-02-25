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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const create_Parking_dto_1 = require("./dto/create-Parking.dto");
const login_dto_1 = require("./dto/login.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    save(CreateUserDto) {
        return this.userService.save(CreateUserDto);
    }
    async finduser(CreateUserDto) {
        return this.userService.find(CreateUserDto);
    }
    async findAll(CreateUserDto) {
        return this.userService.finduser(CreateUserDto);
    }
    async getAll() {
        return await this.userService.getAll();
    }
    async update(CreateUserDto) {
        return await this.userService.updateuser(CreateUserDto);
    }
    async enableuser(CreateUserDto) {
        return await this.userService.enableuser(CreateUserDto);
    }
    async disableuser(CreateUserDto) {
        return await this.userService.disabletype(CreateUserDto);
    }
    async getAlldisable() {
        return await this.userService.getdisable();
    }
    async getAllenable() {
        return await this.userService.getenable();
    }
    async getlogin(LoginDto) {
        return await this.userService.login(LoginDto);
    }
    async forget(CreateUserDto) {
        return await this.userService.updatepin(CreateUserDto);
    }
    async getaccesstoken(CreateUserDto) {
        return await this.userService.getRefreshToken(CreateUserDto.token);
    }
    async getslotbyuserId(createParkingDto) {
        return await this.userService.getslotbyuserId(createParkingDto);
    }
};
__decorate([
    (0, common_1.Post)(`/getregister`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "save", null);
__decorate([
    (0, common_1.Post)(`/userbyid`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "finduser", null);
__decorate([
    (0, common_1.Post)(`/userbymobileno`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(`/getalluser`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)(`/updateemail`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(`/enableuser`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "enableuser", null);
__decorate([
    (0, common_1.Post)(`/disableuser`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "disableuser", null);
__decorate([
    (0, common_1.Get)(`/getdisable`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAlldisable", null);
__decorate([
    (0, common_1.Get)(`/getenable`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllenable", null);
__decorate([
    (0, common_1.Post)(`/login`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getlogin", null);
__decorate([
    (0, common_1.Patch)(`/forgetpassword`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forget", null);
__decorate([
    (0, common_1.Post)(`/refreshToken`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getaccesstoken", null);
__decorate([
    (0, common_1.Post)(`/getAllSlotByUserId`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Parking_dto_1.CreateParkingDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getslotbyuserId", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
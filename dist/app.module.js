"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const enums_1 = require("@nestjs/microservices/enums");
const dist_1 = require("nest-neo4j/dist");
const user_module_1 = require("./user/user.module");
const ticket_module_1 = require("./ticket/ticket.module");
const otp_module_1 = require("./otp/otp.module");
const payment_module_1 = require("./payment/payment.module");
const report_module_1 = require("./report/report.module");
const parking_module_1 = require("./parking/parking.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'auth_microservices',
                    transport: enums_1.Transport.TCP,
                    options: {
                        port: 3010,
                    },
                },
            ]),
            dist_1.Neo4jModule.forRoot({
                scheme: 'neo4j+s',
                host: 'b76e3d84.databases.neo4j.io',
                port: 7687,
                username: 'neo4j',
                password: 'kH8WQkwu-vK5bmjUYjJ2oe1kbcBeoZdDeErj9o8woSk',
            }),
            user_module_1.UserModule,
            ticket_module_1.TicketModule,
            otp_module_1.OtpModule,
            payment_module_1.PaymentModule,
            report_module_1.ReportModule,
            parking_module_1.ParkingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
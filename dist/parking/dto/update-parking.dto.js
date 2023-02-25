"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParkingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_parking_dto_1 = require("./create-parking.dto");
class UpdateParkingDto extends (0, mapped_types_1.PartialType)(create_parking_dto_1.CreateParkingDto) {
}
exports.UpdateParkingDto = UpdateParkingDto;
//# sourceMappingURL=update-parking.dto.js.map
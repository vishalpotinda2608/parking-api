import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
export declare class ParkingController {
    private readonly parkingService;
    constructor(parkingService: ParkingService);
    saveParking(createParkingDto: CreateParkingDto): Promise<any>;
    getAllvacant(createParkingDto: CreateParkingDto): Promise<any>;
    saveParkingZone(createParkingDto: CreateParkingDto): Promise<any>;
    saveSlot(createParkingDto: CreateParkingDto): Promise<any>;
}

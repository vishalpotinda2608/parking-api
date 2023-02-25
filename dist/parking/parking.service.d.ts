import { CreateParkingDto } from './dto/create-parking.dto';
import { Neo4jService } from 'nest-neo4j/dist';
export declare class ParkingService {
    private neo4jService;
    constructor(neo4jService: Neo4jService);
    saveParking(body: CreateParkingDto): Promise<any>;
    getAllvecant(body: CreateParkingDto): Promise<any>;
    saveParkingZone(body: CreateParkingDto): Promise<any>;
    saveSlot(body: CreateParkingDto): Promise<any>;
}

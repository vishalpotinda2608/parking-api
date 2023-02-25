import { CreateOtpDto } from './dto/create-otp.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { HttpService } from '@nestjs/axios';
export declare class OtpService {
    private readonly httpService;
    private neo4jService;
    private readonly logger;
    constructor(httpService: HttpService, neo4jService: Neo4jService);
    createOTP(mobileNo: number): Promise<any>;
    validateOTP(body: CreateOtpDto): Promise<any>;
}

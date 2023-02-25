import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateParkingDto } from './dto/create-Parking.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserService {
    private jwtService;
    private neo4jService;
    constructor(jwtService: JwtService, neo4jService: Neo4jService);
    save(body: CreateUserDto): Promise<any>;
    find(id: CreateUserDto): Promise<any>;
    finduser(body: CreateUserDto): Promise<any>;
    getAll(): Promise<{
        status: boolean;
        msg: string;
        data?: CreateUserDto[];
    }>;
    updateuser(body: CreateUserDto): Promise<any>;
    enableuser(body: CreateUserDto): Promise<any>;
    disabletype(body: CreateUserDto): Promise<any>;
    getdisable(): Promise<{
        status: boolean;
        msg: string;
        data?: CreateUserDto[];
    }>;
    getenable(): Promise<{
        status: boolean;
        msg: string;
        data?: CreateUserDto[];
    }>;
    login(body: LoginDto): Promise<unknown>;
    updatepin(body: CreateUserDto): Promise<any>;
    getRefreshToken(data: string): Promise<any>;
    getslotbyuserId(data: CreateParkingDto): Promise<any>;
}

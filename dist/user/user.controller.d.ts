import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateParkingDto } from './dto/create-Parking.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    save(CreateUserDto: CreateUserDto): Promise<any>;
    finduser(CreateUserDto: CreateUserDto): Promise<any>;
    findAll(CreateUserDto: CreateUserDto): Promise<any>;
    getAll(): Promise<any>;
    update(CreateUserDto: CreateUserDto): Promise<any>;
    enableuser(CreateUserDto: CreateUserDto): Promise<any>;
    disableuser(CreateUserDto: CreateUserDto): Promise<any>;
    getAlldisable(): Promise<any>;
    getAllenable(): Promise<any>;
    getlogin(LoginDto: LoginDto): Promise<any>;
    forget(CreateUserDto: CreateUserDto): Promise<any>;
    getaccesstoken(CreateUserDto: {
        token: string;
    }): Promise<any>;
    getslotbyuserId(createParkingDto: CreateParkingDto): Promise<any>;
}

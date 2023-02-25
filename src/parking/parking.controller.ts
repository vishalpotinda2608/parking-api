import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { STATUS_CODES } from 'http';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  // saveparking
  // @UseGuards(JwtAuthGuard)
  @Post('/saveParking')
  async saveParking(@Body() createParkingDto: CreateParkingDto): Promise<any> {
    return await this.parkingService.saveParking(createParkingDto);
  }

  // get all parking
  // // @UseGuards(JwtAuthGuard)
  @Post('/getAllvacant')
  async getAllvacant(@Body() createParkingDto: CreateParkingDto): Promise<any> {
    return await this.parkingService.getAllvecant(createParkingDto);
  }

  // save slot
  @Post('/saveParkingZone')
  async saveParkingZone(
    @Body() createParkingDto: CreateParkingDto,
  ): Promise<any> {
    return await this.parkingService.saveParkingZone(createParkingDto);
  }

  // save sub-slot
  @Post('/saveSlot')
  async saveSlot(@Body() createParkingDto: CreateParkingDto): Promise<any> {
    return await this.parkingService.saveSlot(createParkingDto);
  }
}

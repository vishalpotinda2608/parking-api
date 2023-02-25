import { AnyNaptrRecord } from 'dns';
import { Date } from 'neo4j-driver';

export class CarOwnerDTO {
  userId: string;
  subSlotId: string;
  ticketId?: string;
  firstName: string;
  lastName: string;
  serialNO: string;
  carNo: string;
  paymentType: string;
  startDate: string;
  endDate: string;
  inTime: string;
  outTime: string;
  vehicleType: string;
  barcodeNo?: number;
  rate?: number;
  mobileNo?: string;
  isActive?: boolean;
  paymentStatus?: boolean;
}

import { parkingTypes } from "../../enums/parkingTypes";

export type createParkingType = {
    name: string,
    spots: number,
    contact: string,
    parkingType: parkingTypes
};
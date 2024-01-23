import { Request, Response } from "express";

import { checkInType } from "../../types/checkInTypes/checkInType";

//import { ParkingValidatorFactory } from "../../utils/parkingValidators/parkingValidatorFactory";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const checkIn = async (req: Request<{}, {}, checkInType>, res: Response) => {

    const { parkingId, userType } = req.body;
    
    try {

        //const weekDays = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
        //const date = new Date();

        //const day = weekDays[date.getDay()];

        
        
        console.log('parkingId: ', parkingId, ' , typeof: ', typeof(parkingId));
        console.log('userType: ', userType, ' , typeof: ', typeof(userType));

        
        const parkingFound = await prisma.parkings.findUnique({
            where: {
                id: parkingId
            }
        });

        if(!parkingFound) return res.status(404).json({"msg": "parking not found !!!"});
        
        console.log('parkingFound: ', parkingFound);
        
        console.log('parkingFound.parking: ', parkingFound.parking, ' , typeof: ', typeof(parkingFound.parking));
        
        //const { parking } = parkingFound;

        //const parkingValidator = ParkingValidatorFactory.createValidator(parkingFound.parking);
        
        
        res.status(200).json({"msg": "checkin"});
        
    } catch (error) {
        console.error('error: ', error);
        res.status(500).json({"error": error});
    }
}

export { checkIn };
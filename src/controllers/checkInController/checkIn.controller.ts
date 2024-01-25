import { Request, Response } from "express";

//import { checkInType } from "../../types/checkInTypes/checkInType";

import { ParkingValidatorFactory } from "../../utils/parkingValidators/ParkingValidatorFactory";
import { userTypes } from "../../enums/userTypes";
import { WEEK_DAYS } from "../../utils/constants/weekDays";

//
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const checkIn = async (req: Request, res: Response) => {

    const { parkingId, userType } = req.body;
    
    try {
        
        const date = new Date();

        const dayOfWeek = WEEK_DAYS[date.getDate()];
        
        const parkingFound = await prisma.parkings.findUnique({
            where: {
                id: parkingId
            }
        });

        if(!parkingFound) return res.status(404).json({"msg": "parking not found !!!"});
        
        
        const { parking: parkingType } = parkingFound;
        const parkingValidator = ParkingValidatorFactory.createValidator(parkingType);
        
        
        let userTypeIndex = 0;

        if(userType ===  'visitor'){
            userTypeIndex = userTypes.visitor;
        }

        if(userType === 'provider'){
            userTypeIndex = userTypes.provider;
        }

        const result = parkingValidator.validate(userTypeIndex, dayOfWeek);
        
        res.status(200).json({"result": result});
        
    } catch (error) {
        console.error('error: ', error);
        res.status(500).json({"error": error});
    }
}

export { checkIn };
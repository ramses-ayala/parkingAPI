import { Request, Response } from "express";

import { checkInType } from "../../types/checkInTypes/checkInType";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const checkIn = async (req: Request<{}, {}, checkInType>, res: Response) => {

    const { parkingId, userType } = req.body;
    
    try {

        console.log('parkingId: ', parkingId);
        console.log('userType: ', userType);
        
        const parkingFound = await prisma.parkings.findUnique({
            where: {
                id: parkingId
            }
        });

        if(!parkingFound) return res.status(404).json({"msg": "parking not found !!!"});
        
        
        
        res.status(200).json({"msg": "checkin"});
        
    } catch (error) {
        console.error('error: ', error);
        res.status(500).json({"error": error});
    }
}

export { checkIn };
import { Request, Response } from "express";

import { checkInType } from "../../types/checkInTypes/checkInType";

const checkIn = (req: Request<{}, {}, checkInType>, res: Response) => {

    const { parkingId, userType } = req.body;
    
    try {
        
        console.log('parkingId: ', parkingId);
        console.log('userType: ', userType);
        
        
        res.status(200).json({"msg": "checkin"});
        
    } catch (error) {
        console.error('error: ', error);
        res.status(500).json({"error": error});
    }
}

export { checkIn };
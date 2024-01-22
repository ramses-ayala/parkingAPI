import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateParkingInfo = async(req: Request, res: Response) => {

    const { id, contact, spots } = req.body;

    try {

        const parkingFound = await prisma.parkings.findUnique({
            where: {
                id
            }
        });

        console.log("id: ",id);
        console.log("contact: ", contact);
        console.log("spots: ", spots);
        
        console.log('parkingFound: ', parkingFound);
        
        if(!parkingFound) return res.status(404).json({"msg": "Parking not found !!!"});

        res.status(200).json({"msg": "from updateParking"});
    } catch (error) {
        console.error("Occurs an error updating parking info: ", error);
        res.status(500).json({"error": error});
    }
}

export { updateParkingInfo };
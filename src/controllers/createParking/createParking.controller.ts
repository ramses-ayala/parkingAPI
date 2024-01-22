import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createParking = async(req: Request, res: Response) => {

    const { name, spots, contact, parkingType } = req.body;

    try {

        const parkingFound = await prisma.parkings.findUnique({
            where: {
                name
            }
        });

        if(parkingFound){
            return res.status(409).json({
                "Error": "Conflict", 
                "msg": "That name is already registered, try to register another one !!!"
            });
        }

        if(spots < 50) return res.status(422).json({"Error": "Unprocessable Entity", "msg": "spot number is very small !!!"});

        if(spots > 1500) return res.status(422).json({"Error": "Unprocessable Entity", "msg": "spot number is very big !!!"});
        
        const parkingCreated = await prisma.parkings.create({
            data: {
                name,
                spots,
                contact,
                parking: parkingType
            }
        });
        
        res.status(200).json({"msg": "parking registered !!!", parkingCreated});

    } catch (error) {
        console.log('error: ', error);
        
        res.status(500).json({"error": error});
    }
}

export { createParking };
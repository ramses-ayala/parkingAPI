import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import Joi from "joi";

//import { createParkingType } from "../../types/createParking/createParkingType";

const schema = Joi.object({
    name: Joi.string()
        .required(),

    spots: Joi.number()
        .integer()
        .min(50)
        .max(1500),

    contact: Joi.string()
        .pattern(new RegExp(/^(\+\d{2})(\d{10})$/)),
    
    parkingType: Joi.any()
        .valid('public','private','courtesy')
        .required()
        
});

const prisma = new PrismaClient();

const createParking = async(req: Request, res: Response) => {

    const { name, spots, contact, parkingType } = req.body;

    try {

        const parkingFound = await prisma.parkings.findUnique({
            where: {
                name
            }
        });

        const { error } = schema.validate({name, spots, contact, parkingType});

        if(error !== undefined){
            return res.status(422).json({"msg": error.details[0].message});
        }

        if(parkingFound){
            return res.status(409).json({
                "Error": "Conflict", 
                "msg": "That name is already registered, try to register another one !!!"
            });
        }
        
        const parkingCreated = await prisma.parkings.create({
            data: {
                name,
                spots,
                contact,
                parking: parkingType
            }
        });
        
        res.status(200).json({"msg": "parking registered !!!", "data": parkingCreated});

    } catch (error) {
        console.error('error: ', error);
        res.status(500).json({"error": error});
    }
}

export { createParking };
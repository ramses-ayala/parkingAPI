import { Request, Response } from "express";
import Joi from "joi";

import { PrismaClient } from "@prisma/client";
import { updateParkingInfoType } from "../../types/updateParking/updateParkingInfoType";

const prisma = new PrismaClient();

const schema = Joi.object({
    id: Joi.string()
        .min(36)
        .max(36)
        .required(),

    contact: Joi.string()
        .pattern(new RegExp(/^(\+\d{2})(\d{10})$/)),

    spots: Joi.number()
        .integer()
        .min(50)
        .max(1500)
});

const updateParkingInfo = async(req: Request<{}, {}, updateParkingInfoType>, res: Response) => {

    const { id, contact, spots } = req.body;

    try {

        const parkingFound = await prisma.parkings.findUnique({
            where: {
                id
            }
        });
        
        const { error } = schema.validate({id, contact, spots});

        if(error !== undefined){
            return res.status(422).json({"msg": error.details[0].message});
        }

        if(!parkingFound) return res.status(404).json({"msg": "Parking not found !!!"});

        const recordUpdated = await prisma.parkings.update({
            where: {
                id
            },
            data: {
                contact,
                spots
            }
        });

        res.status(200).json({"msg": "record updated successfully !!!", "data": recordUpdated});

    } catch (error) {
        console.error("Occurs an error updating parking info: ", error);
        res.status(500).json({"error": error});
    }
}

export { updateParkingInfo };
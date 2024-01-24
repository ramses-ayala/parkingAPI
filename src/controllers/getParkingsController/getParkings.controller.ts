import {Request, Response} from "express";

import { getParkingsTypes } from "../../types/getParkingsTypes/getParkingsTypes";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getParkings = async(req: Request<{}, {}, getParkingsTypes>, res: Response) => {

    let {skip = '0', take = '10', orderBy = 'createdAt', orderDirection = 'asc'} = req.query;

    console.log('req.query : ', req.query);

    orderBy = orderBy.toString();

    try {

        const parkings = await prisma.parkings.findMany({
           take: Number(take),
           skip: Number(skip),
           orderBy: {
            [orderBy]: orderDirection
           }
        });
        
        res.status(200).json({"totalItems": parkings.length, "data": parkings});
        
    } catch (error) {
        console.error('error: ', error);    
        res.status(500).json({"error": error});
    }
}
export {getParkings}
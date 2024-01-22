import { Request, Response } from "express";

const checkIn = (_req: Request, res: Response) => {

    try {
        
    } catch (error) {
        console.error('error: ', error);
        res.status(500).json({"error": error});
    }
}

export {checkIn};
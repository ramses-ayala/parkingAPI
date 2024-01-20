import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const tokenValidator = (req: Request, res: Response ,next: Function) => {
    
    const auth = req.header('authorization');
    const token = auth?.split(' ')[1] as string;

    jwt.verify(token, process.env.SECRET_PASSWORD as string, (err, _decodedToken) => {

        if(err){
            return res.status(401).json({'msg': 'Not authorized'})
        }
        else{
            next();
        }
    });
}
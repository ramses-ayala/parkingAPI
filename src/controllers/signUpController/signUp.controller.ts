import { Request, Response } from "express";

const signUp = (_req: Request, res: Response) => {

    //const {email, password} = req.body;

    try {
        
        res.status(200).json({"msg": "signUp"});
    } catch (error) {
        console.error("Occurs an error signing up the user : ", error);
        res.status(500).json({"error": error});
    }
}

export {signUp};
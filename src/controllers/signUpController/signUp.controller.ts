import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { credentialsType } from "../../types/credentials/credentialsType";
import { signUpSchemaValidation } from "../../utils/schemaValidations/signUpSchemaValidation";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const signUp = async(req: Request<{}, {}, credentialsType>, res: Response) => {

    const { email, password } = req.body;

    try {

        const userFound = await prisma.users.findUnique({
            where: {
                email
            }
        });

        let { error } = signUpSchemaValidation.validate({email, password});

        if(error !== undefined){
            return res.status(422).json({
                "msg": error.details[0].path[0] !== 'email' ? 
                    `Password must have at least 8 characters, 1 lowercase, 1 uppercase, one number, and a symbol (!@#$%*)` 
                    : 
                    `Enter a valid email`
            });
        }
            
        if(userFound){
            return res.status(409).json({
                "Error": "Conflict",
                "msg": "That email is already registered !!!"
            });
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const userData = {
            ...req.body,
            password: encryptedPassword
        };

        await prisma.users.create({
            data: userData,
        });

        res.status(200).json({"msg": "user registered"});

    } catch (error) {
        console.error("Occurs an error signing up the user : ", error);
        res.status(500).json({"error": error});
    }
}

export {signUp};
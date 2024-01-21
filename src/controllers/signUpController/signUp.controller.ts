import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { credentials } from "../../types/credentials/credentials";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signUp = async(req: Request<{}, {}, credentials>, res: Response) => {

    const {email, password} = req.body;

    try {
        const userFound = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if(userFound){
            return res.status(200).json({'msg': 'That email is already registered !!!'});
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const userData = {
            ...req.body,
            password: encryptedPassword
        };

        await prisma.users.create({
            data: userData,
        });

        res.status(200).json({"data": "user registered"});

    } catch (error) {
        console.error("Occurs an error signing up the user : ", error);
        res.status(500).json({"error": error});
    }
}

export {signUp};
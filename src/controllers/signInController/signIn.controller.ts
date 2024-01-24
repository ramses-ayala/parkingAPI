import { Request, Response } from 'express';
import Joi from "joi";

import bcrypt from 'bcrypt';

import { generateToken } from '../../utils/jwt/generateToken';


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    
    password: Joi.string()
        .required()
})

const signIn = async (req: Request, res: Response) => {
    
    const { email, password } = req.body;

    try {

        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });

        let { error } = schema.validate({email, password});

        if(error !== undefined){
            return res.status(422).json({
                "msg": error.details[0].path[0] !== 'email' ? 
                    `Enter a valid password !!!`
                    :
                    `Enter a valid email !!!`
            });
        }

        if(!user) return res.status(404).json({'data': 'User not found !!!'});

        const match = await bcrypt.compare(password, user.password);

        if(match !== true){
            return res.status(404).json({'data': 'Password incorrect !!!'});
        }

        const token = generateToken(user);

        return res.status(200).json({'data': {'email': user.email, 'token': token}});

    } catch (error) {
        res.status(500).json({"error": error});
    }
}

export {signIn};
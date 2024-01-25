import Joi from "joi";

export const signUpSchemaValidation = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    
    password: Joi.string()
        .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*])[A-Za-z\d!@#$%*]{8,}$/))
        .required()
});
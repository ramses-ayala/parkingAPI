import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
    return jwt.sign({id: user.id, email: user.email}, process.env.SECRET_PASSWORD as string, {expiresIn: '1h'});
}
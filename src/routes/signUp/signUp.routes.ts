import { Router } from "express";
const routesSignUp = Router();

import { signUp } from "../../controllers/signUpController/signUp.controller";

routesSignUp.post("/signUp", signUp);

export {routesSignUp};
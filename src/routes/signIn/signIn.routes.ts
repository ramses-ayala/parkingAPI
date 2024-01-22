import { Router } from "express";
const routesSignIn = Router();

import { signIn } from "../../controllers/signInController/signIn.controller";

routesSignIn.post("/signIn", signIn);

export {routesSignIn};
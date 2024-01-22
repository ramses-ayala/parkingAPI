import { Router } from "express";
const routes = Router();

import { routesSignUp } from "./routes/signUp/signUp.routes";
import { routesSignIn } from "./routes/signIn/signIn.routes";
import { routesCreateParking } from "./routes/createParking/createParking.routes";
import { routesCheckIn } from "./routes/checkIn/checkIn.routes";

routes.use(routesSignUp);
routes.use(routesSignIn);
routes.use(routesCreateParking);
routes.use(routesCheckIn);

export {routes};
import { Router } from "express";

const routesCreateParking = Router();

import { tokenValidator } from "../../utils/tokenValidator";
import { createParking } from "../../controllers/createParking/createParking.controller";


routesCreateParking.post("/createParking", tokenValidator, createParking);


export {routesCreateParking};
import { Router } from "express";

const routesParking = Router();

import { tokenValidator } from "../../utils/jwt/tokenValidator";

import { getParkings } from "../../controllers/getParkingsController/getParkings.controller";

routesParking.get("/getParkings", tokenValidator, getParkings);

export {routesParking};
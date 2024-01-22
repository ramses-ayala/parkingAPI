import { Router } from "express";

const routesCheckIn = Router();

import { checkIn } from "../../controllers/checkInController/checkIn.controller";

routesCheckIn.post("/checkIn",checkIn);

export {routesCheckIn};
import { Router } from "express";

const routesCheckIn = Router();

import { tokenValidator } from "../../utils/jwt/tokenValidator";
import { checkIn } from "../../controllers/checkInController/checkIn.controller";

routesCheckIn.post("/checkIn", tokenValidator, checkIn);

export { routesCheckIn };
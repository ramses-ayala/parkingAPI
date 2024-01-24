import { Router } from "express";
const routesUpdateParkingInfo = Router();

import { updateParkingInfo } from "../../controllers/updateParkingInfoController/updateParkingInfo.controller";

import { tokenValidator } from "../../utils/jwt/tokenValidator";

routesUpdateParkingInfo.patch("/updateParkingInfo", tokenValidator, updateParkingInfo);

export {routesUpdateParkingInfo};
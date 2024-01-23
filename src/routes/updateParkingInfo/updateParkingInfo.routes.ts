import { Router } from "express";
const routesUpdateParkingInfo = Router();

import { updateParkingInfo } from "../../controllers/updateParkingInfoController/updateParkingInfo.controller";

import { tokenValidator } from "../../utils/tokenValidator";

routesUpdateParkingInfo.patch("/updateParkingInfo", tokenValidator, updateParkingInfo);

export {routesUpdateParkingInfo};
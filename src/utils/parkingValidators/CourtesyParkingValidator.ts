//import { userTypes } from "../../enums/userTypes";

class CourtesyParkingValidator{

    validate(userType: number, dayOfWeek: string){
        if(userType === 2 && this.isWeekend(dayOfWeek)){
            return {"success": true};
        }else{
            return {"success": false, "errorCode": 'INVALID_USER_TYPE', "message": "Cannot step into this courtesy parking !!!"};
        }
    }

    isWeekend(dayOfWeek: string){
        
        if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
            return true;
        }

        return false;
    }
}

export {CourtesyParkingValidator};
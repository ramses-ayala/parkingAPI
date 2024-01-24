//import { userTypes } from "../../enums/userTypes";

class PrivateParkingValidator{

    validate(userType: number, dayOfWeek: string){
        if(userType === 0 && this.isWeekday(dayOfWeek)){
            return {"success": true};
        }else{
            return {"success": false, "errorCode": "INVALID_USER_TYPE", "message": "Cannot step into this private parking !!!"};
        }
    }

    isWeekday(dayOfWeek: string){

        if(dayOfWeek !== 'Saturday' && dayOfWeek !== 'Sunday'){
            return true;
        }
        return false;
    }
}

export {PrivateParkingValidator};
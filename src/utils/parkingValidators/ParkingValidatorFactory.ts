import { CourtesyParkingValidator } from "./CourtesyParkingValidator";
import { PrivateParkingValidator } from "./PrivateParkingValidator";

class ParkingValidatorFactory{

    static createValidator(parkingType: string) {

        if(parkingType === 'courtesy'){
            return new CourtesyParkingValidator();
        }

        else if(parkingType === 'private'){
            return new PrivateParkingValidator();
        }
        
        else{
            throw new Error('Invalid parking type :(');
        }
    }

}

export { ParkingValidatorFactory };
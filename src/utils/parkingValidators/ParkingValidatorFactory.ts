import { PublicParkingValidator } from "./PublicParkingValidator";
import { CourtesyParkingValidator } from "./CourtesyParkingValidator";
import { PrivateParkingValidator } from "./PrivateParkingValidator";

class ParkingValidatorFactory{

    static createValidator(parkingType: string) {

        switch(parkingType){
            case 'public': 
            return new PublicParkingValidator();

            case 'private':
                return new PrivateParkingValidator();

            case 'courtesy':
                return new CourtesyParkingValidator();
            
            default:
                throw new Error('Invalid parking type :(');
        }

    }

}

export { ParkingValidatorFactory };
import supertest from "supertest";

//import { checkIn } from "../controllers/checkInController/checkIn.controller";
import { app } from "../../index";

// mock prisma client
jest.mock('@prisma/client');

//const { PrismaClient } = require('@prisma/client');
//const prismaMock = new PrismaClient();

describe('checkIn endpoint testing', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });



    it('should return success for public parking', async () => {

        const response = await supertest(app)
            .post('/checkIn')
            .send({ parkingId: 'f0b38525-760c-4f25-a207-e18fee9bbd2a', userType: 'visitor' });
        

        expect(response.status).toBe(200);
        expect(response.body.result.success).toBe(true);

    });



    it('should return success for private parking on weekdays', async () => {
    

        const response = await supertest(app)
            .post('/checkIn')
            .send({ parkingId: 'e8809e59-686b-4862-a559-646393050d4d', userType: 'corporate' });

        expect(response.status).toBe(200);
        expect(response.body.result.success).toBe(true);
    });

    it('should return error for private parking on weekends', async () => {
        const response = await supertest(app)
            .post('/checkIn')
            .send({ parkingId: '1b780043-3ae3-4149-8d79-e80ee10201eb', userType: 'corporate' });

        
        expect(response.status).toBe(200);
        expect(response.body.result.success).toBe(false);
        expect(response.body.result.errorCode).toBe('INVALID_USER_TYPE');
        expect(response.body.result.message).toBe('Cannot step into this private parking !!!');
    });
});
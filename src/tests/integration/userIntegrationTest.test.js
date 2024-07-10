import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';  
import User from '../../models/User';
import { generateToken } from '../../utils/tokenUtils';
import { hashingPassword } from '../../utils/passwordUtils';
import { comparePassword } from '../../utils/passwordUtils';
import { sendEmail } from '../../helpers/sendEmail';
import { emailTempletes } from '../../utils/emailTempletes';




jest.mock('../../models/User');
jest.mock('../../utils/tokenUtils');
jest.mock('../../utils/passwordUtils');
jest.mock('../../utils/passwordUtils');
jest.mock('../../validations/userValidation');
jest.mock('../../helpers/sendEmail');
jest.mock('../../utils/emailTempletes');



beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    jest.clearAllTimers();
});

describe('userController', () => {
    });
    describe('POST /user/register', () => {
        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        });
        it('should register a user', async () => {
            const mockUser = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'test@example.com',
                location: 'Test Location',
                dateOfBirth: '2000-01-01',
                gender: 'male',
                password: 'StrongPassw0rd!'
            };
            const hashedPassword = 'hashedpassword';
            hashingPassword.mockResolvedValue(hashedPassword);
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({ ...mockUser, password: hashedPassword });
            generateToken.mockReturnValue('token');
            sendEmail.mockResolvedValue(true);
    

            const res = await request(app)
                .post('/user/register')
                .send(mockUser);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'user created, check email for account verification ');
        })

        it('should return validation errors for invalid data', async () => {
            const invalidUser = {
                firstName: '', // Invalid: empty
                lastName: '1234', // Invalid: not only letters
                email: 'invalidemail', // Invalid: not a valid email
                location: '', // Invalid: empty
                dateOfBirth: 'invalid-date', // Invalid: not a valid ISO8601 date
                gender: 'other', // Invalid: not 'male' or 'female'
                password: 'weak' // Invalid: not a strong password
            };

            const res = await request(app)
                .post('/user/register')
                .send(invalidUser);

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Failed to register user');
        });
    });
    

    describe('POST /user/login', () => {
        it('should login a user', async () => {
            const mockUser = { email: 'test@example.com', password: 'hashedpassword', isVerified: true };
            const mockLoginData = { email: 'test@example.com', password: 'password' };
            User.findOne.mockResolvedValue(mockUser);
            comparePassword.mockResolvedValue(true);
            generateToken.mockReturnValue('token');

            const res = await request(app)
                .post('/user/login')
                .send(mockLoginData);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });



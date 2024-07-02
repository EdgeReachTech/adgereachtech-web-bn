import request from 'supertest';
import app from '../../app';  // Assuming your Express app is exported from app.js
import User from '../../models/User';
import { generateToken } from '../../utils/tokenUtils';
import { hashingPassword } from '../../utils/passwordUtils';

jest.mock('../../models/User');
jest.mock('../../utils/tokenUtils');
jest.mock('../../utils/passwordUtils');

describe('userController', () => {
    describe('POST /register', () => {
        it('should register a user', async () => {
            const mockUser = { email: 'test@example.com', password: 'password' };
            hashingPassword.mockResolvedValue('hashedpassword');
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(mockUser);
            generateToken.mockReturnValue('token');

            const res = await request(app)
                .post('/register')
                .send(mockUser);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });

    describe('POST /login', () => {
        it('should login a user', async () => {
            const mockUser = { email: 'test@example.com', password: 'hashedpassword', isVerified: true };
            const mockLoginData = { email: 'test@example.com', password: 'password' };
            User.findOne.mockResolvedValue(mockUser);
            comparePassword.mockResolvedValue(true);
            generateToken.mockReturnValue('token');

            const res = await request(app)
                .post('/login')
                .send(mockLoginData);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });

    // Add more integration tests for other endpoints...
});

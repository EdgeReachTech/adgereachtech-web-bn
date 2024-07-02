import { userService } from '../../services/userServices';
import User from '../../models/User';
import { sendMessage } from '../../helpers/sendEmail';
import { generateToken } from '../../utils/tokenUtils';
import { comparePassword } from '../../utils/passwordUtils';

jest.mock('../../models/User');
jest.mock('../../helpers/sendEmail');
jest.mock('../../utils/tokenUtils');
jest.mock('../../utils/passwordUtils');

describe('userServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a user', async () => {
            const mockUser = { email: 'test@example.com', password: 'password' };
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(mockUser);
            generateToken.mockReturnValue('token');
            sendMessage.mockResolvedValue(true);

            const result = await userService.registerUser(mockUser);

            expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
            expect(User.create).toHaveBeenCalledWith(mockUser);
            expect(generateToken).toHaveBeenCalledWith(mockUser);
            expect(sendMessage).toHaveBeenCalled();
            expect(result).toEqual({
                status: 200,
                message: 'user created, check email for account verification ',
                verificationToken: 'token'
            });
        });
    });

    describe('login', () => {
        it('should login a user', async () => {
            const mockUser = { email: 'test@example.com', password: 'password', isVerified: true };
            const mockLoginData = { email: 'test@example.com', password: 'password' };
            User.findOne.mockResolvedValue(mockUser);
            comparePassword.mockResolvedValue(true);
            generateToken.mockReturnValue('token');

            const result = await userService.login(mockLoginData);

            expect(User.findOne).toHaveBeenCalledWith({ email: mockLoginData.email });
            expect(comparePassword).toHaveBeenCalledWith(mockLoginData.password, mockUser.password);
            expect(generateToken).toHaveBeenCalled();
            expect(result).toEqual({
                status: 200,
                message: 'Logged in successfully',
                token: 'token'
            });
        });
    });

    // Add more unit tests for other methods...
});

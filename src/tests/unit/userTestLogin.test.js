import { userService } from '../../services/userServices';
import User from '../../models/User';
import { generateToken } from '../../utils/tokenUtils';
import { comparePassword } from '../../utils/passwordUtils';

jest.mock('../../models/User');
jest.mock('../../helpers/sendEmail');
jest.mock('../../utils/tokenUtils');
jest.mock('../../utils/passwordUtils');

describe('userService', () => {
    afterEach(() => {
        jest.clearAllMocks();
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
});

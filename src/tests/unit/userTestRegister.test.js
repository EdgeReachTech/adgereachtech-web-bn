import { userService } from '../../services/userServices';
import User from '../../models/User';
import { sendEmail } from '../../helpers/sendEmail';
import { generateToken } from '../../utils/tokenUtils';

jest.mock('../../models/User');
jest.mock('../../helpers/sendEmail');
jest.mock('../../utils/tokenUtils');
jest.mock('../../utils/passwordUtils');

describe('userService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a user', async () => {
            const mockUser = { email: 'test@example.com', password: 'password' };
            console.log(User.findOne); // Check if the method is defined
            console.log(User.create);  // Check if the method is defined
    
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(mockUser);
            generateToken.mockReturnValue('token');
            sendEmail.mockResolvedValue(true);

            const result = await userService.registerUser(mockUser);

            expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
            expect(User.create).toHaveBeenCalledWith(mockUser);
            expect(generateToken).toHaveBeenCalledWith(mockUser);
            expect(sendEmail).toHaveBeenCalled();
            expect(result).toEqual({
                status: 200,
                message: 'user created, check email for account verification ',
                verificationToken: 'token'
            });
        });
    });
});

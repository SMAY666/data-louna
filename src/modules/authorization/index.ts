import {jwt} from '../../interfaces/JWT';
import {ENV} from '../../constants/env';
import {userRepository} from '../user/repository';

class AuthorizationRepository {
    // ----- [ PRIVATE METHODS ] ---------------------------------------------------------------------------------------

    private signAccessToken(userId: number) {
        const tokenData = {userId};

        return jwt.sign(tokenData, {liveTime: 3.6e+6 /*1 hour*/, secret: ENV.JWT_SECRET});
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public async login(username: string, password: string): Promise<{accessToken: string}> {
        const user = await userRepository.get({username});

        if (!user || password !== user._dataValues.passwordHash) {
            throw new Error('Incorrect password or username');
        }

        const accessToken = this.signAccessToken(user._dataValues.id);
        return {accessToken};
    }
}

export const authorizationRepository = new AuthorizationRepository();
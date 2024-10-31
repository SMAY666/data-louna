import {userRepository} from '../user/repository';


class AuthorizationRepository {

    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------
    public async login(username: string, password: string): Promise<{userId: number, success: true}> {
        const user = await userRepository.get({username});

        if (!user || password !== user._dataValues.passwordHash) {
            throw new Error('Incorrect password or username');
        }

        return {userId: user._dataValues.id, success: true};
    }
}

export const authorizationRepository = new AuthorizationRepository();
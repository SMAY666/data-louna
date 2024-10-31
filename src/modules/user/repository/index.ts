import {UserInstance} from '../model/types';
import {UserModel} from '../model';
import {GetOptions} from './types';

class UserRepository {
    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public async getById(id: number): Promise<UserInstance> {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    public async get(options?: GetOptions): Promise<UserInstance> {
        const user = await UserModel.findOne({
            where: {...(options ? options : {})}
        });
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}

export const userRepository = new UserRepository();

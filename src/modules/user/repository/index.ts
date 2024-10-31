import {UserInstance, UserUpdateAttributes} from '../model/types';
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

    public async update(id: number, data: UserUpdateAttributes): Promise<UserInstance> {
        const user = await this.getById(id);

        return user.update(data);
    }

    public async changePassword(id: number, oldPassword: string, newPassword: string): Promise<UserInstance> {
        const user = await this.getById(id);
        if (oldPassword !== user._dataValues.passwordHash) {
            throw new Error('Incorrect password');
        }

        return user.update({passwordHash: newPassword});
    }
}

export const userRepository = new UserRepository();

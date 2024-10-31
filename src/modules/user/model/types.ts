import {ModelInstance} from '../../../interfaces/postgres/model/types';

export type UserAttributes = {
    id: number
    username: string
    passwordHash: string
    balance: number
};

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'balance'>;
export type UserUpdateAttributes = Partial<UserCreationAttributes>;

export type UserInstance = ModelInstance<{creationAttributes: UserCreationAttributes, attributes: UserAttributes}>
import {pgConnection} from '../../../connections/postgresConnection';
import {UserInstance} from './types';
import {PostgresTypes} from '../../../interfaces/postgres/model/types';

export const UserModel = pgConnection.define<UserInstance>({
    id: {
        primaryKey: true,
        type: PostgresTypes.INT8,
        autoincrement: true,
        allowNull: false,
    },
    username: {
        type: PostgresTypes.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: PostgresTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: PostgresTypes.REAL,
        allowNull: false,
    }
}, 'users');


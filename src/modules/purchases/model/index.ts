import {pgConnection} from '../../../connections/postgresConnection';
import {PurchaseInstance} from './types';
import {PostgresTypes} from '../../../interfaces/postgres/model/types';

export const PurchaseModel = pgConnection.define<PurchaseInstance>({
    id: {
        primaryKey: true,
        type: PostgresTypes.INT8,
        autoincrement: true,
        allowNull: false
    },
    userId: {
        type: PostgresTypes.INT8,
        allowNull: false
    },
    itemId: {
        type: PostgresTypes.INT8,
        allowNull: false
    },
    price: {
        type: PostgresTypes.REAL,
        allowNull: false,
    },
    date: {
        type: PostgresTypes.TIMESTAMP,
        allowNull: false,
    }
}, 'purchases');

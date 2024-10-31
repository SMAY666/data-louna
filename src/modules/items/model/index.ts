import {pgConnection} from '../../../connections/postgresConnection';
import {ItemInstance} from './types';
import {PostgresTypes} from '../../../interfaces/postgres/model/types';

export const ItemModel = pgConnection.define<ItemInstance>({
    id: {
        primaryKey: true,
        type: PostgresTypes.INT8,
        autoincrement: true,
        allowNull: false,
    },
    market_hash_name: {
        type: PostgresTypes.STRING,
        allowNull: false,
    },
    tradable: {
        type: PostgresTypes.REAL,
        allowNull: true,
    },
    min_price: {
        type: PostgresTypes.REAL,
        allowNull: true,
    },
}, 'items')
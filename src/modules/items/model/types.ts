import {ModelInstance} from '../../../interfaces/postgres/model/types';

export type ItemAttributes = {
    id: number
    market_hash_name: string
    tradable?: number
    min_price?: number
}

export type ItemCreationAttributes = Omit<ItemAttributes, 'id' | 'created_at' | 'updated_at'>;

export type ItemInstance = ModelInstance<{creationAttributes: ItemCreationAttributes, attributes: ItemAttributes}>
import {ModelInstance} from '../../../interfaces/postgres/model/types';

export type PurchaseAttribute = {
    id: number
    userId: number
    itemId: number
    price: number
    date: Date
};

export type PurchaseCreationAttribute = Omit<PurchaseAttribute, 'id'>;
export type PurchaseInstance = ModelInstance<{creationAttributes: PurchaseCreationAttribute, attributes: PurchaseAttribute}>;

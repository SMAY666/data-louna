import axios from "axios";
import {redisConnection} from '../../../connections/redisConnection';
import {ItemModel} from '../model';
import {ItemInstance} from '../model/types';
import {usersRepository} from '../../user/repository';
import {PurchaseModel} from '../../purchases/model';
import {pgConnection} from '../../../connections/postgresConnection';


class ItemsRepository {
    public async requestFromApi() {
        const result = await axios.get('https://api.skinport.com/v1/items');

        const neededData = result.data.map((item) => ({
            market_hash_name: item.market_hash_name,
            min_price: item.min_price,
            tradable: item.suggested_price,
        }));
        // Данные будут храниться 5 минут
        redisConnection.setEx(`items`, 3000, JSON.stringify(neededData.splice(0, 20)));

       return await ItemModel.bulkCreate(neededData.splice(0, 20));
    }

    public async getById(id: number): Promise<ItemInstance> {
        const item = await ItemModel.findById(id);
        if (!item) {
            throw new Error(`Item not found`);
        }

        return item;
    }

    public async getAll() {
        const dataFromRedis = await redisConnection.get('items');
        if (!dataFromRedis) {
            return await this.requestFromApi();
        }

        return await ItemModel.findAll();
    }

    public async buy(price: 'tradable' | 'min_price', id: number, userId: number): Promise<{balance: number}> {
        const item = await this.getById(id);
        const user = await usersRepository.getById(userId);

        const userBalance = user._dataValues.balance;

        if (!item._dataValues[price]) {
            throw new Error('Something went wrong');
        }

        if (userBalance < item._dataValues[price]) {
            throw new Error('Not enough balance');
        }

        // await user.update({balance: userBalance - item._dataValues[price]});


        await pgConnection.startTransaction([
            `update public.users set balance=${userBalance - item._dataValues[price]} where id=${userId};`,
            `insert into public.purchases ("userId", "itemId", price, date) values (${userId}, ${id}, ${item._dataValues[price]}, '${new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear()}');`,
        ]);

        const newBalance = await usersRepository.getBalance(userId);

        return {balance: newBalance}
    }
}

export const itemsRepository = new ItemsRepository();
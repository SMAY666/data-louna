import axios from "axios";
import {redisConnection} from '../../../connections/redisConnection';
import {ItemModel} from '../model';


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

    public async getAll() {
        const dataFromRedis = await redisConnection.get('items');
        if (!dataFromRedis) {
            return await this.requestFromApi();
        }

        return await ItemModel.findAll();
    }
}

export const itemsRepository = new ItemsRepository();
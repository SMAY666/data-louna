import {RouteHandler} from 'fastify';
import {itemsRepository} from '../../../modules/items/repository';

class Controller {
    public getAll: RouteHandler<any> = async (req, reply) => {
        const items = await itemsRepository.getAll();
        reply.status(200).send(items.map(({_dataValues}) => _dataValues));
    }
}

export const controller = new Controller();
import {RouteHandler} from 'fastify';
import {itemsRepository} from '../../../modules/items/repository';
import {BuyRequest} from './types';

class Controller {
    public getAll: RouteHandler<any> = async (req, reply) => {
        const items = await itemsRepository.getAll();
        reply.status(200).send(items.map(({_dataValues}) => _dataValues));
    }

    public buy: RouteHandler<BuyRequest> = async (req, reply) => {
        const deal = await itemsRepository.buy(req.body.price, req.body.itemId, req.session.userId);
        reply.status(200).send(deal);
    }
}

export const controller = new Controller();
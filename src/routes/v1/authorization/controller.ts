import {RouteHandler} from 'fastify';
import {LoginRequest} from './types';
import {authorizationRepository} from '../../../modules/authorization';

class Controller {
    public login: RouteHandler<LoginRequest> = async (req, reply) => {
        const token = await authorizationRepository.login(req.body.username, req.body.password);

        reply.status(200).send(token);
    }
}

export const controller = new Controller();
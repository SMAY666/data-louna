import {RouteHandler} from 'fastify';
import {LoginRequest} from './types';
import {authorizationRepository} from '../../../modules/authorization';

class Controller {
    public login: RouteHandler<LoginRequest> = async (req, reply) => {
        const {userId, success} = await authorizationRepository.login(req.body.username, req.body.password);

        if (success) {
            req.session.authenticated = true;
            req.session.userId = userId;
        }

        reply.status(200).send({logged: success});
    }
}

export const controller = new Controller();
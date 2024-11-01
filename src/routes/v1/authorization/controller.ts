import {RouteHandler} from 'fastify';
import {LoginRequest} from './types';
import {authorizationRepository} from '../../../modules/authorization';
import {ENV} from '../../../constants/env';

class Controller {
    public login: RouteHandler<LoginRequest> = async (req, reply) => {
        const {userId, success} = await authorizationRepository.login(req.body.username, req.body.password);

        if (success) {
            req.session.authenticated = true;
            req.session.userId = userId;
            req.session.expiresIn = Date.now() + ENV.SESSION_LIVE_TIME;
        }

        reply.status(200).send({logged: success});
    }
}

export const controller = new Controller();
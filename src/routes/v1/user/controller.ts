import {RouteHandler} from 'fastify';
import {ChangePasswordRequest} from './types';
import {userRepository} from '../../../modules/user/repository';

class Controller {
    public changePassword: RouteHandler<ChangePasswordRequest> = async (req, reply) => {
        const updated = await userRepository.changePassword(req.session.userId, req.body.oldPassword, req.body.newPassword);
        reply.status(200).send(updated._dataValues);
    }
}

export const controller = new Controller();

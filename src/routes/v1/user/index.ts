import {FastifyPluginCallback} from 'fastify';
import {controller} from './controller';

export const usersRoute: FastifyPluginCallback = (instance, opts, done) => {
    instance.post(
        '/change_password',
        {},
        controller.changePassword
    )
    done();
}
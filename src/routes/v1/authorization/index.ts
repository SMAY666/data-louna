import {FastifyPluginCallback} from 'fastify';
import {controller} from './controller';


export const authorizationRoute: FastifyPluginCallback = (instance, opts, done) => {
    instance.post(
        '/login',
        {},
        controller.login,
    );
    done();
}

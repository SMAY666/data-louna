import {FastifyPluginCallback} from 'fastify';
import {authorizationRoute} from './v1/authorization';
import {usersRoute} from './v1/user';

export const apiRoutes: FastifyPluginCallback = (instance, opts, done) => {
    void instance.register(authorizationRoute, {prefix: '/auth'});
    void instance.register(usersRoute, {prefix: '/users'});
    done();
}

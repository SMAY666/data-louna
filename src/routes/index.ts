import {FastifyPluginCallback} from 'fastify';
import {authorizationRoute} from './v1/authorization';
import {usersRoute} from './v1/user';
import {itemsRoutes} from './v1/item';


export const apiRoutes: FastifyPluginCallback = (instance, opts, done) => {
    void instance.register(authorizationRoute, {prefix: '/auth'});
    void instance.register(usersRoute, {prefix: '/users'});
    void instance.register(itemsRoutes, {prefix: '/items'});
    done();
}

import {FastifyPluginCallback} from 'fastify';
import {controller} from './controller';

export const itemsRoutes: FastifyPluginCallback = (instance, opts, done) => {
    instance.get(
        '/',
        {},
        controller.getAll,
    );
    instance.post(
        '/buy',
        {},
        controller.buy,
    );

    done();
};

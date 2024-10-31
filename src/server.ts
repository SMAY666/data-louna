import fastify from 'fastify';
import {ENV} from './constants/env';
import {authorizationRoute} from './routes/v1/authorization';


export const server = fastify({
    logger: false,
    ajv: {},
});

void server.register(authorizationRoute, {prefix: '/auth'});

export async function startServer() {
    return new Promise((resolve, reject) => {
        server.listen({
            host: ENV.HOST,
            port: ENV.PORT,
        }, (err, address) => {
            if (err) {
                reject(err);
            } else {
                resolve(address);
            }
        })
    })
}
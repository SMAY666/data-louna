import fastify from 'fastify';
import {ENV} from './constants/env';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import {apiRoutes} from './routes';
import {verifySession} from './middlewares/verifySession';


export const server = fastify({
    logger: false,
    ajv: {},
});

void server.register(fastifyCookie);
void server.register(fastifySession, {
    secret: ENV.SESSION_SECRET,
    cookie: {
        secure: false,
        maxAge: ENV.SESSION_LIVE_TIME
    }
});

void server.register(apiRoutes, {prefix: '/api'});
server.decorate('verifySession', verifySession);

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
import fastify from 'fastify';
import {ENV} from './constants/env';
import {authorizationRoute} from './routes/v1/authorization';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';


export const server = fastify({
    logger: false,
    ajv: {},
});

void server.register(fastifyCookie);
void server.register(fastifySession, {
    secret: ENV.SESSION_SECRET,
    cookie: {
        secure: false,
        maxAge: 3600 // 1 hour
    }
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
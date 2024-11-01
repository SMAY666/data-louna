import fastify from 'fastify';
import {ENV} from './constants/env';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import {apiRoutes} from './routes';
import {verifySession} from './middlewares/verifySession';


export const server = fastify({
    logger: false,
    ajv: {
        customOptions: {
            allowUnionTypes: true,
            removeAdditional: 'all',
            coerceTypes: 'array',
            allErrors: true,
            keywords: [
                {
                    type: ['string', 'integer'],
                    keyword: 'isDate',
                    modifying: true,
                    schema: false,
                    error: {
                        message: 'Должно быть датой',
                    },
                    validate(value: string | number, {
                        parentData,
                        parentDataProperty,
                    }, dataCxt): boolean {
                        const convertedValue = new Date((typeof value === 'string') && !isNaN(+value) ? +value : value);
                        parentData[parentDataProperty] = convertedValue;
                        return !isNaN(convertedValue.getTime());
                    },
                },
            ],
        },
    },
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

server.addSchema({
    $id: 'id',
    type: 'integer',
    minimum: 1,
});
server.addSchema({
    $id: 'date',
    type: ['integer', 'string'],
    isDate: true,
});

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
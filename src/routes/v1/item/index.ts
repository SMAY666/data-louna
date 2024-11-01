import {FastifyPluginCallback} from 'fastify';
import {controller} from './controller';

export const itemsRoutes: FastifyPluginCallback = (instance, opts, done) => {
    instance.get(
        '/',
        {
            schema: {
                response: {
                    200: {
                        type: 'array',
                        items: {
                            properties: {
                                id: {
                                    $ref: 'id',
                                },
                                market_hash_name: {
                                    type: 'string',
                                },
                                tradable: {
                                    type: 'number',
                                },
                                min_price: {
                                    type: 'number',
                                }
                            }
                        }
                    }
                }
            }
        },
        controller.getAll,
    );
    instance.post(
        '/buy',
        {
            // @ts-ignore
            onRequest: instance.verifySession,
            schema: {
                body: {
                    type: 'object',
                    required: ['price', 'itemId'],
                    properties: {
                        price: {
                            type: 'string',
                        },
                        itemId: {
                            type: 'number',
                            minimum: 1,
                        }
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            balance: {
                                type: 'number',
                            }
                        }
                    }
                }
            }
        },
        controller.buy,
    );

    done();
};

import {FastifyPluginCallback} from 'fastify';
import {controller} from './controller';


export const authorizationRoute: FastifyPluginCallback = (instance, opts, done) => {
    instance.post(
        '/login',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            minLength: 1,
                        },
                        password: {
                            type: 'string',
                            minLength: 1,
                        },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            logged: {
                                type: 'boolean'
                            }
                        }
                    }
                }
            }
        },
        controller.login,
    );
    done();
}

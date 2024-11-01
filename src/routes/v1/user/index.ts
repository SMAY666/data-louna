import {FastifyPluginCallback} from 'fastify';
import {controller} from './controller';

export const usersRoute: FastifyPluginCallback = (instance, opts, done) => {
    instance.post(
        '/change_password',
        {
            // @ts-ignore
            onRequest: instance.verifySession,
            schema: {
                body: {
                    type: 'object',
                    required: ['oldPassword', 'newPassword'],
                    properties: {
                        oldPassword: {
                            type: 'string',
                            minLength: 1,
                        },
                        newPassword: {
                            type: 'string',
                            minLength: 1,
                        },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: {
                                $ref: 'id',
                            },
                            username: {
                                type: 'string',
                            },
                            passwordHash: {
                                type: 'string',
                            },
                            balance: {
                                type: 'number',
                            }
                        }
                    }
                }
            }
        },
        controller.changePassword
    )
    done();
}
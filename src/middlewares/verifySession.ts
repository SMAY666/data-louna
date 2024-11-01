import {FastifyReply, FastifyRequest} from 'fastify';

export const verifySession = async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.session.authenticated || Date.now() >= req.session.expiresIn) {
        return reply.status(401).send('Unauthorized');
    }
}
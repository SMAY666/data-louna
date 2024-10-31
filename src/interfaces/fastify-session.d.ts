import {FastifySessionObject} from '@fastify/session';

declare module '@fastify/session' {
    export interface FastifySessionObject  {
            authenticated: boolean
            userId: number
    }
}

export {};
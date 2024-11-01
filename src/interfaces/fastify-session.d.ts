declare module '@fastify/session' {
    export interface FastifySessionObject  {
            authenticated: boolean
            userId: number
            expiresIn: number
    }
}

export {};
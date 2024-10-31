export type LoginRequest = {
    Body: {
        username: string
        password: string
    },
    Reply: {
        logged: boolean
    }
}
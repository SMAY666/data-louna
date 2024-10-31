export type LoginRequest = {
    Body: {
        username: string
        password: string
    },
    Reply: {
        accessToken: string
    }
}
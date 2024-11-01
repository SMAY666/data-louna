export type BuyRequest = {
    Body: {
        price: 'tradable' | 'min_price'
        itemId: number
    }
    Reply: {balance: number}
}
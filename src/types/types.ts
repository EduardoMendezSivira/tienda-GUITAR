export type Tguitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type TcarritoItem = Tguitar & {
    quantity: number
}
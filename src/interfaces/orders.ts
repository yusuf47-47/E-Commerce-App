
import { CartResponse } from "./cart"
import { UserResponse } from "./login"


export interface OrdersI {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: UserResponse
    cartItems: CartResponse[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}

export interface ShippingAddress {
    details: string
    phone: string
    city: string
}







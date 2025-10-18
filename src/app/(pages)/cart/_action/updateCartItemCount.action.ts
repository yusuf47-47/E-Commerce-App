'use server'

import { getUserToken } from "@/app/Helper/getUserToken";
import { CartResponse } from "@/interfaces";


export async function updateCartItemCountAction(productId: string, count: number) {

    const token = await getUserToken();

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
        method: 'PUT',
        body: JSON.stringify({ count }),
        headers: {
            token: token + '',
            "Content-type": "application/json"
        }
    });
    const data: CartResponse = await response.json();
    return data;
}
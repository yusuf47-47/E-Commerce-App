'use server'

import { getUserToken } from "@/app/Helper/getUserToken";
import { ShippingI } from "@/interfaces";



export async function cashCheckoutAction(cartId: string, shippingAddress: ShippingI) {


    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: 'POST',
        body: JSON.stringify({ shippingAddress }),
        headers: {
            token: token + '',
            "Content-type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}
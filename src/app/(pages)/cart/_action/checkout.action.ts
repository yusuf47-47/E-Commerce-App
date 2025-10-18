'use server'

import { getUserToken } from "@/app/Helper/getUserToken";



export async function checkoutAction(cartId: string, shippingAddress: any) {


    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
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
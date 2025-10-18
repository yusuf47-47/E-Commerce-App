'use server'

import { getUserToken } from "@/app/Helper/getUserToken"



export async function addToWishlistAction(productId: string) {

    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
            token: token + '',
            "Content-type": "application/json"
        }
    });

    const data = await response.json();

    return data;
}
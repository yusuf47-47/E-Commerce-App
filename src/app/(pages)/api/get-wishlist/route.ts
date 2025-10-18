

import { getUserToken } from "@/app/Helper/getUserToken";
import { NextResponse } from "next/server";


export async function GET() {

    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "GET",
        headers: {
            token: token + ''
        }
    });
    const data = await response.json();

    return NextResponse.json(data);
}

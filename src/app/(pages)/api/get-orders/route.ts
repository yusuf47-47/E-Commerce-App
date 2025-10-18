import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const userId = request.headers.get('userId');

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    const data = await response.json();

    return NextResponse.json(data);
}

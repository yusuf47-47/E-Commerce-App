import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { productId: string } }
) {
    const { productId } = params;

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
    const data = await response.json();

    return NextResponse.json(data);
}

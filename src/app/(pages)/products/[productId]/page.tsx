import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import StarIcon from '@/components/Icons/StarIcon';

import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AddToCart from '@/components/AddToCart/AddToCart';



export default async function ProductDetails({ params }: { params: Params }) {

    const { productId } = await params;

    const response = await fetch(`http://localhost:3000/api/get-products/${productId}`);
    const { data: product }: { data: ProductI } = await response.json();




    return <>
        <Card className='grid md:grid-cols-3 items-center'>
            <div className='col-span-1'>
                <ProductSlider images={product.images} altContent={product.title} />
            </div>
            <div className="col-span-2 space-y-4">
                <CardHeader className=''>
                    <CardDescription>{product.brand.name}</CardDescription>
                    <CardTitle className='text-2xl'>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    {/* <CardAction>Card Action</CardAction> */}
                </CardHeader>
                <CardContent className='space-y-2'>
                    <CardDescription>{product.category.name}</CardDescription>
                    <div className="flex gap-6 justify-between items-center">
                        <p className='flex gap-1'> <StarIcon /> <span>{product.ratingsAverage}</span> </p>
                        <p className=''> Remaining <span>{product.ratingsQuantity}</span> </p>
                    </div>
                    <div className="flex gap-6 justify-between items-center">
                        <p className=''> Quantity: <span>{product.quantity}</span> </p>
                        <p className='flex gap-1 items-center'> EGP <span className='text-xl font-semibold'>{product.price}</span> </p>
                    </div>
                </CardContent>
                <AddToCart productId={product.id} />
            </div>
        </Card>
    </>
}

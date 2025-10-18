'use client'

import { formatCurrency } from "@/app/Helper/formatPrice";
import { Card } from "@/components/ui/card";
import { CartResponse, OrdersI } from "@/interfaces";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AllOrders() {


    const [userOrders, setUserOrders] = useState<OrdersI[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getOrders() {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api/get-orders`, {
            headers: { 'userId': localStorage.getItem('userId') + '' }
        });
        const data: OrdersI[] = await response.json();
        setUserOrders(data);
        setIsLoading(false);
    }
    console.log(userOrders);

    useEffect(() => {
        getOrders();
    }, [])

    return <>{isLoading ? <div className='flex justify-center items-center min-h-[75vh]'><Loader2 className='animate-spin size-12' /> </div> : <div className="space-y-7">
        {userOrders?.map((order, i) => (
            <Card key={order._id}>
                <div className="px-5">
                    <div className=" ">
                        <h2 className="text-lg font-bold text-gray-800">
                            Order #{i + 1}
                        </h2>
                        <div className="text-sm text-gray-600">
                            <p><span className="font-semibold">City :</span>  {order.shippingAddress.city}</p>
                            <p><span className="font-semibold">Phone :</span> {order.shippingAddress.phone}</p>
                            <p><span className="font-semibold">Total :</span> {order.totalOrderPrice} EGP</p>
                            <p><span className="font-semibold">Payment :</span> {order.paymentMethodType}</p>
                        </div>
                        <hr className="my-3" />
                    </div>
                    {order.cartItems.map((cartItems) => (
                        <div key={cartItems.product._id} className=' mx-auto'>
                            <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-6 gap-6">
                                <div className="lg:col-span-3 space-y-4">
                                    <div className="flex gap-4 rounded-xl  p-4  bg-gray-50">
                                        <img src={cartItems.product.imageCover}
                                            alt={cartItems.product.title}
                                            className='w-24 h-24 rounded-lg object-cover md:w-40 md:h-40' />
                                        <div className="flex min-w-0">
                                            <div className="flex min-w-0 flex-col sm:items-start sm:justify-between  gap-2">
                                                <div className="">
                                                    <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                                        {cartItems.product.title}
                                                    </h3>
                                                    <p className='text-sm text-muted-foreground mt-1'>
                                                        {cartItems.product.brand.name} . {cartItems.product.category.name}
                                                    </p>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="font-semibold mt-3">
                                                        {formatCurrency(cartItems.price)}
                                                    </div>
                                                    <div className="mt-1">
                                                        <span className="text-sm text-muted-foreground">Quantity :</span> {cartItems.count}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        ))}
    </div>}

    </>
}

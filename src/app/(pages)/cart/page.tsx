'use client'

import { formatCurrency } from '@/app/Helper/formatPrice'
import Loading from '@/app/loading'
import Checkout from '@/components/Checkout/Checkout'
import { CartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { clearCartAction } from './_action/clearCart.action'
import { updateCartItemCountAction } from './_action/updateCartItemCount.action'
import { removeFromCartAction } from './_action/removeFromCart.action'
import Image from 'next/image'

export default function Cart() {


    const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);


    if (typeof cartData?.data.products[0]?.product == 'string' || cartData == null) {
        getCart();
    }

    const [removingId, setRemovingId] = useState<string | null>(null);

    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const [isClearing, setIsClearing] = useState<boolean>(false);




    async function removeFromCart(productId: string) {

        setRemovingId(productId);

        const data = await removeFromCartAction(productId);

        if (data.status == 'success') {
            toast.success('Product Removed Successfully');
            setCartData(data);
        }
        setRemovingId(null);
    }

    async function updateCartItemCount(productId: string, count: number) {

        if (count == 0) {
            removeFromCart(productId);
        } else {

            setUpdatingId(productId);

            const data = await updateCartItemCountAction(productId, count);


            if (data.status == 'success') {
                toast.success('Product Quantity Updated Successfully');
                setCartData(data);
            }
            setUpdatingId(null);
        }
    }

    async function clearCart() {

        setIsClearing(true);

        const data = await clearCartAction();

        if (data.message == 'success') {
            setCartData(null);
        }

        setIsClearing(false);
    }








    return <>
        {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading /> : cartData?.numOfCartItems! > 0 ? <div className='container mx-auto px-4 py-6'>
            <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
            <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} items in your cart</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-6 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {cartData?.data.products.map((item) => <div key={item._id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                        <Image src={item.product.imageCover}
                            alt={item.product.title}
                            width={600} height={600}
                            className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div className="min-w-0">
                                    <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                        {item.product.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground mt-1'>
                                        {item.product.brand.name} . {item.product.category.name}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-semibold">
                                        {formatCurrency(item.price)}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={'outline'}
                                        aria-label='decrease'
                                        className='size-8 font-bold rounded-lg border hover:bg-accent'
                                        onClick={() => updateCartItemCount(item.product._id, item.count - 1)}>
                                        -
                                    </Button>
                                    <span className='w-6 text-center font-medium'>
                                        {updatingId === item.product._id ? <Loader2 className='animate-spin' /> : item.count}
                                    </span>
                                    <Button
                                        variant={'outline'}
                                        aria-label='increase'
                                        className='size-8 font-bold rounded-lg border hover:bg-accent'
                                        onClick={() => updateCartItemCount(item.product._id, item.count + 1)}>
                                        +
                                    </Button>
                                </div>
                                <Button
                                    onClick={() => { removeFromCart(item.product.id) }}
                                    aria-label='remove'
                                    variant='outline' className='size-9 text-destructive hover:text-destructive'>
                                    {removingId === item.product.id ? <Loader2 className='animate-spin' /> : <Trash2 />}
                                </Button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className="lg:col-span-1 sticky top-22">
                    <div className="rounded-xl border p-5 shadow-sm">
                        <h2 className='text-lg font-semibold'>Order Summary</h2>
                        <div className="mt-4 mb-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className='text-sm text-muted-foreground'>
                                    Subtotal ({cartData?.numOfCartItems} items)
                                </span>
                                <span className="font-semibold">
                                    {formatCurrency(cartData?.data.totalCartPrice!)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className='text-sm text-muted-foreground'>
                                    Shipping
                                </span>
                                <span className="text-emerald-600 font-medium">
                                    free
                                </span>
                            </div>
                        </div>
                        <div className="pt-3 border-t" />
                        <div className="flex items-center justify-between">
                            <span className='text-base font-semibold'>
                                Total
                            </span>
                            <span className="text-base font-bold">
                                {formatCurrency(cartData?.data.totalCartPrice!)}
                            </span>
                        </div>

                        <Checkout cartId={cartData?.cartId!} />

                        <Link href={'/products'}>
                            <Button variant={'outline'} className='w-full mt-5 h-11 rounded-xl border hover:bg-accent'>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                    <Button variant={"outline"} className='flex ms-auto text-destructive hover:text-destructive mt-2 cursor-pointer' onClick={clearCart}>
                        {isClearing ? <Loader2 className='animate-spin' /> : <Trash2 />} Clear Cart
                    </Button>
                </div>
            </div>
        </div> :
            <div className="min-h-[60vh] flex justify-center items-center flex-col">
                <h2 className='text-2xl mb-3'>Your Cart Is Empty </h2>
                <Link href={'/products'}>
                    <Button>
                        Add Ones
                    </Button>
                </Link>
            </div>
        }
    </>
}
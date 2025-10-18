'use client'
import AddToCart from '@/components/AddToCart/AddToCart';
import { ProductsInfoContext } from '@/components/Context/ProductsContext';
import StarIcon from '@/components/Icons/StarIcon';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ProductI } from '@/interfaces';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

export default function CategoryProdutsInfo({ categoryId }: { categoryId: string }) {

    const { products }: { products: ProductI[] | null } = useContext(ProductsInfoContext);


    const filteredProducts = products?.filter(product => product.category._id === categoryId);

    return <>
        {filteredProducts?.length == 0 ? <div className='flex flex-col justify-center items-center min-h-[70vh]'>
            <h1>No Products Now</h1>
            <Link href={'/products'}>
                <Button variant={'default'} className='w-full mt-5 h-11'>
                    Continue Shopping
                </Button>
            </Link>
        </div> :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {filteredProducts?.map((product) => (
                    <div className="" key={product.id}>
                        <Card className="">
                            <Link href={'/products/' + product.id} >
                                <Image
                                    src={product.imageCover}
                                    alt=""
                                    width={300}
                                    height={400}
                                    className="w-full"
                                />
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                                    <CardDescription>{product.category.name}</CardDescription>
                                    <CardAction>{product.brand.name}</CardAction>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2 mb-4">
                                        <div className="flex flex-wrap">
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                        </div>
                                        <p>({product.ratingsAverage})</p>
                                    </div>
                                    <p className="font-medium text-xl">
                                        Price :<span className="font-bold ">{product.price}</span>
                                    </p>
                                </CardContent>
                            </Link>
                            <AddToCart productId={product.id} />
                        </Card>
                    </div>
                ))}
            </div >
        }
    </>
}

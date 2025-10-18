'use client'
import { formatCurrency } from '@/app/Helper/formatPrice';
import AddToCart from '@/components/AddToCart/AddToCart';
import { ProductsInfoContext } from '@/components/Context/ProductsContext';
import StarIcon from '@/components/Icons/StarIcon';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ProductI } from '@/interfaces';
import { Loader2 } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
export default function ProdutctsInfo() {

    const { products, isLoading }: { products: ProductI[] | null, isLoading: boolean } = useContext(ProductsInfoContext);

    return (
        <>{isLoading ? <div className='flex justify-center items-center min-h-[75vh]'><Loader2 className='animate-spin size-12' /> </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {products?.map((product) => (
                <div className="" key={product.id}>
                    <Card className="py-4 gap-3">
                        <Link href={'/products/' + product.id} >
                            <Image
                                src={product.imageCover}
                                alt=""
                                width={300}
                                height={400}
                                className="w-full"
                            />
                            <CardHeader className='mt-4'>
                                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                                <CardDescription>{product.category.name}</CardDescription>
                                <CardAction>{product.brand.name}</CardAction>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 my-2">
                                    <div className="flex flex-wrap">
                                        <StarIcon />
                                        <StarIcon />
                                        <StarIcon />
                                        <StarIcon />
                                    </div>
                                    <p>({product.ratingsAverage})</p>
                                </div>
                                <p className="font-medium text-xl">
                                    <span className="font-bold ">{formatCurrency(product.price)}</span>
                                </p>
                            </CardContent>
                        </Link>
                        <AddToCart productId={product.id} />
                    </Card>
                </div>
            ))}
        </div >}

        </>
    );
}

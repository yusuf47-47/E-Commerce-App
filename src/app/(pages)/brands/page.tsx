
import {
    Card,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CategoryI } from '@/interfaces';


import Image from 'next/image';
import Link from 'next/link';

export default async function Brands() {
    const response = await fetch('http://localhost:3000/api/get-brands');

    const { data: brands }: { data: CategoryI[] } = await response.json();

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {brands?.map((brand) => (
                    <div className="" key={brand._id}>
                        <Card className="flex flex-col justify-center items-center">
                            <Link href={'/brands/' + brand._id} >
                                <Image
                                    src={brand.image}
                                    alt=""
                                    width={300}
                                    height={400}
                                    className="size-40"
                                />
                                <CardHeader>
                                    <CardTitle className="line-clamp-1 text-center mt-3">{brand.name}</CardTitle>
                                </CardHeader>
                            </Link>
                        </Card>
                    </div>
                ))}
            </div >
        </>
    );
}

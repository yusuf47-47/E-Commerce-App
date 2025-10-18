
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CategoryI } from '@/interfaces';


import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {
  const response = await fetch(`http://localhost:3000/api/get-categorys`);

  const { data: categorys }: { data: CategoryI[] } = await response.json();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {categorys?.map((category) => (
          <div className="" key={category._id}>
            <Card className="">
              <Link href={'/categories/' + category._id} >
                <Image
                  src={category.image}
                  alt=""
                  width={300}
                  height={400}
                  className="size-62"
                />
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-center mt-3">{category.name}</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          </div>
        ))}
      </div >
    </>
  );
}

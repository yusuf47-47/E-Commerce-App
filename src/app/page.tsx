import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return <>
    <div className="flex flex-col justify-center items-center min-h-[75vh] gap-5 text-center">
      <h1 className="text-5xl font-bold mb-6">Wlecome To ShopMart</h1>
      <p className="text-xl text-gray-500 px-[15%]">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service</p>
      <div className="flex gap-2 mt-3">
        <Link href={'products'}>
          <Button className="text-lg border-2 border-black hover:bg-transparent hover:text-black px-10 py-6 cursor-pointer" variant={'default'}>Shop Now</Button></Link>
        <Link href={'/categories'}>
          <Button className="text-lg border-2 border-black hover:bg-black hover:text-white px-10 py-6 cursor-pointer" variant={'outline'}>Browse Categories</Button>
        </Link>
      </div>
    </div>
  </>
}

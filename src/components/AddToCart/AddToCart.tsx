"use client"

import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToWishlistAction } from "@/app/(pages)/products/_action/addToWishlist.action";
import { ProductsInfoContext } from "../Context/ProductsContext";
import { removeFromWishlistAction } from "@/app/(pages)/products/_action/removeFromWishlist.action";

export default function AddToCart({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState(false);
    const [isAddingToWish, setIsAddingToWish] = useState(false);
    const [isRmoveingFromWish, setIsRmoveingFromWish] = useState(false);
    const { setCartData } = useContext(CartContext);
    const { setProductsInWishlist, productsInWishlist, wishlistLoading, products } = useContext(ProductsInfoContext);

    const session = useSession();

    const router = useRouter()

    async function addProductToCart() {
        if (session.status == 'authenticated') {
            setIsLoading(true);

            const data = await addToCartAction(productId);

            setCartData(data);

            data.status == 'success' && toast.success(data.message);

            setIsLoading(false);
        } else {
            router.push('/login')
        }
    }


    async function addProductToWishlist() {
        if (session.status == 'authenticated') {
            setIsAddingToWish(true);

            const data = await addToWishlistAction(productId);

            if (data.status == 'success') {
                data.status == 'success' && toast.success(data.message);
                const wishlistIds = data.data;

                const wishlistProducts = products?.filter(p => wishlistIds.includes(p.id)) || [];

                setProductsInWishlist(wishlistProducts);
            }

            setIsAddingToWish(false);
        } else {
            router.push('/login')
        }
    }


    async function removeProductToWishlist() {
        if (session.status == 'authenticated') {
            setIsRmoveingFromWish(true);

            const data = await removeFromWishlistAction(productId);
            data.status == 'success' && toast.success(data.message);
            if (data.status == 'success') {
                const wishlistIds = data.data;

                const wishlistProducts = products?.filter(p => wishlistIds.includes(p.id)) || [];

                setProductsInWishlist(wishlistProducts);
            }
            setIsRmoveingFromWish(false);
        } else {
            router.push('/login')
        }
    }


    const isInWishlist = productsInWishlist?.some(p => p.id === productId);

    return <>
        <CardFooter className='gap-2 '>
            <Button disabled={isLoading} onClick={addProductToCart} className="grow cursor-pointer">
                {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCartIcon />}    Add To Cart
            </Button>
            <Button
                onClick={isInWishlist ? removeProductToWishlist : addProductToWishlist}
                variant={isInWishlist ? "destructive" : "outline"}
                className={`size-9 ${isInWishlist
                    ? "text-white bg-red-700 hover:bg-red-600"
                    : "text-destructive hover:text-destructive"
                    }`
                }
                disabled={wishlistLoading}
            >
                {isAddingToWish || isRmoveingFromWish ? <Loader2 className="animate-spin" /> : <HeartIcon />}

            </Button>
        </CardFooter>
    </>
}

"use client"


import { ProductI } from "@/interfaces";
import { useSession } from "next-auth/react";

import { createContext, ReactNode, useEffect, useState } from "react";


export const ProductsInfoContext = createContext<{
    products: ProductI[] | null,
    setProductsInWishlist: (value: ProductI[] | null) => void,
    productsInWishlist: ProductI[] | null,
    wishlistLoading: boolean,
    isLoading: boolean,

}>({
    products: null,
    setProductsInWishlist: () => { },
    productsInWishlist: null,
    wishlistLoading: true,
    isLoading: false,

});



export default function ProductsInfoContextProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<ProductI[] | null>(null)
    const [productsInWishlist, setProductsInWishlist] = useState<ProductI[] | null>(null);

    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function getProdutsInfo() {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/get-products');
        const { data: products }: { data: ProductI[] } = await response.json();
        setProducts(products);
        setIsLoading(false);
    }


    async function getWishlist() {
        setWishlistLoading(true);
        const response = await fetch(`http://localhost:3000/api/get-wishlist`);
        const { data: produtsInwish }: { data: ProductI[] } = await response.json();
        setProductsInWishlist(produtsInwish);
        setWishlistLoading(false);
    }

    const session = useSession();
    useEffect(() => {
        getProdutsInfo();
        getWishlist();
    }, [])



    useEffect(() => {
        async function fetchWishlist() {
            if (session.status === "authenticated") {
                setWishlistLoading(true);
                const response = await fetch("http://localhost:3000/api/get-wishlist");
                const data = await response.json();
                setProductsInWishlist(data.data);
                setWishlistLoading(false);
            } else if (session.status === "unauthenticated") {
                setProductsInWishlist([]);
                setWishlistLoading(false);
            }
        }
        fetchWishlist();
    }, [session.status]);



    return <ProductsInfoContext.Provider value={{ products, setProductsInWishlist, productsInWishlist, wishlistLoading, isLoading }}>
        {children}
    </ProductsInfoContext.Provider>
}
"use client"


import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";


export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart: () => void
}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { }
});

export default function CartContextProvider({ children }: { children: ReactNode }) {

    const [cartData, setCartData] = useState<CartResponse | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getCart() {

        const response = await fetch('http://localhost:3000/api/get-cart');
        const data: CartResponse = await response.json();

        setCartData(data);

        if (cartData?.data.cartOwner) {
            localStorage.setItem('userId', cartData.data.cartOwner);
        }

        setIsLoading(false);
    }
    const session = useSession();


    useEffect(() => {
        if (session.status == 'authenticated') {
            getCart();
        }
    }, [session.status])



    return <CartContext.Provider value={{ isLoading, setIsLoading, cartData, setCartData, getCart }}>
        {children}
    </CartContext.Provider>
}
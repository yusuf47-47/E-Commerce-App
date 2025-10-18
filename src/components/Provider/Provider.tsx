"use client"

import React, { ReactNode } from 'react'
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import { SessionProvider } from "next-auth/react";
import ProductsInfoContextProvider from '../Context/ProductsContext';



export default function Provider({ children }: { children: ReactNode }) {
    return <>
        <SessionProvider>
            <ProductsInfoContextProvider>
                <CartContextProvider>
                    <Navbar />
                    <main className="container mx-auto py-4">
                        {children}
                        <Toaster />
                    </main>
                </CartContextProvider>
            </ProductsInfoContextProvider>
        </SessionProvider>
    </>
}

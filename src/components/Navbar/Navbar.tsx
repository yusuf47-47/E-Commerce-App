"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeartIcon, Loader2, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

  const { isLoading, cartData } = useContext(CartContext);

  const session = useSession();



  return (
    <>
      <nav className="shadow-sm py-3 text-2xl bg-white font-semibold sticky top-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1>
              <Link href={"/"}>Shop Mart</Link>
            </h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {session.status == 'authenticated' && <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/allorders">Orders</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-1">
              {session.status == "authenticated" && <h2 className="text-sm me-2"> Hi {session.data?.user.name}</h2>}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-0 cursor-pointer">
                  <UserIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {
                    session.status == "authenticated" ? <>
                      <Link href={"/profile"}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => { signOut({ callbackUrl: '/' }) }}>LogOut</DropdownMenuItem>
                    </> : <>
                      <Link href={"/login"}>
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href={"/register"}>
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  }
                </DropdownMenuContent>
              </DropdownMenu>
              {
                session.status == 'authenticated' && <div className="flex justify-center items-center ">
                  <Link href={'/wishlist'}>
                    <HeartIcon className="hover:text-destructive" />
                  </Link>
                  <Link href={'/cart'} className="relative py-3 px-2">

                    <ShoppingCartIcon />
                    <div className=" size-5 absolute bg-black text-white text-sm flex justify-center items-center rounded-full -top-1 end-0">
                      {isLoading ? <Loader2 className="animate-spin size-4 " /> : cartData?.numOfCartItems}
                    </div>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"

import { checkoutAction } from "@/app/(pages)/cart/_action/checkout.action"
import { cashCheckoutAction } from "@/app/(pages)/cart/_action/cashCheckout.action"
import { useRouter } from "next/navigation"



export default function Checkout({ cartId }: { cartId: string }) {



    const cityInput = useRef<HTMLInputElement | null>(null);
    const detailsInput = useRef<HTMLInputElement | null>(null);
    const phoneInput = useRef<HTMLInputElement | null>(null);

    const [checkingOut, setCheckingOut] = useState<boolean>(false);
    const [cashCheckingOut, setCashCheckingOut] = useState<boolean>(false);



    async function checkoutSession() {
        setCheckingOut(true);

        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }

        const data = await checkoutAction(cartId, shippingAddress);

        if (data.status == 'success') {
            location.href = data.session.url;
        }

        setCheckingOut(false);
    }

    let rounter = useRouter();

    async function cashCheckoutSession() {
        setCashCheckingOut(true);

        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }

        const data = await cashCheckoutAction(cartId, shippingAddress);

        if (data.status == 'success') {
            rounter.push('/allorders')
        }

        setCashCheckingOut(false);
    }


    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='w-full mt-5 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:text-white'>
                        Proceed to Checkout
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Shipping Address</DialogTitle>
                        <DialogDescription>
                            please add your shipping address
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="city">City</Label>
                            <Input ref={cityInput} id="city" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="details">Details</Label>
                            <Input ref={detailsInput} id="details" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input ref={phoneInput} id="phone" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={cashCheckoutSession} type="submit">{cashCheckingOut ? <Loader2 className="animate-spin" /> : 'Cash'}</Button>
                        <Button onClick={checkoutSession} type="submit">{checkingOut ? <Loader2 className="animate-spin" /> : 'Visa'}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}

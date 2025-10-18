"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import { signIn } from 'next-auth/react'
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
    email: z.email('Invalid Email').nonempty('Email is Required'),
    password: z.string('Invalid password').nonempty('password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/, 'Password Is InValid'),
})

export function LoginForm() {

    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true);

        const response = await signIn('credentials', {
            callbackUrl: '/',
            redirect: true,
            email: values.email,
            password: values.password
        })

        setIsLoading(false);
    }

    return (
        <Card className="p-6 w-md gap-4">
            <Form {...form}>
                {searchParams.get('error') ? <h1 className="text-destructive  text-center py-3">{searchParams.get('error')}</h1> : ''}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Your Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Your Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} className="w-full cursor-pointer" type="submit">{isLoading && <Loader2 className="animate-spin" />}Submit</Button>
                </form>
            </Form>
            <div className="text-center">Don't have an account? <Link className="text-blue-500" href={'/register'}>Register</Link></div>
        </Card>

    )
}
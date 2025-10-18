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


import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formSchema } from "../Schema/schema"
import { registerAction } from "../_action/register.action"
import Link from "next/link"





export function RegisterForm() {

    const [isLoading, setIsLoading] = useState(false);
    const [messToUser, setMessToUser] = useState<string>('success');

    let searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }
    })

    let router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true);

        const data = await registerAction(values);

        setMessToUser(data.message);

        if (data.message == 'success') {
            router.push('/login');
        }
        setIsLoading(false);
    }

    return (
        <Card className="p-6 w-md gap-4">
            <Form {...form}>
                {messToUser !== 'success' ? <h1 className="text-destructive  text-center py-3">{messToUser}</h1> : ''}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UserName</FormLabel>
                                <FormControl>
                                    <Input type="name" placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>rePassword</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Your rePassword" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Your phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} className="w-full cursor-pointer" type="submit">{isLoading && <Loader2 className="animate-spin" />}Submit</Button>
                </form>
            </Form>
            <div className="text-center">Already h  ave an account? <Link className="text-blue-500" href={'/login'}>Login</Link></div>
        </Card>

    )
}
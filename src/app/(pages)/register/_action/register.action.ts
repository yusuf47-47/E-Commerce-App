"use server"

import { formSchema } from "../Schema/schema";
import { z } from "zod";

export async function registerAction(userData: z.infer<typeof formSchema>) {

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json" }
    })
    const data = await response.json();

    return data;
}
import { z } from "zod"

export const formSchema = z.object({
    name: z.string().nonempty('Name Is Required')
        .min(3, 'Name Must Be More Than 3 Characters')
        .max(10, 'Name Must Be Less Than 20 Characters'),

    email: z.string().nonempty('Email Is Required')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email Must Be Valid'),

    password: z.string().nonempty('Password Is Required')
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/, 'Password Is InValid'),

    rePassword: z.string().nonempty('rePassword Is Required'),

    phone: z.string().nonempty('Phone Number Is Required').regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, 'InVaild Phone Number Format')

}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'Password and rePassword not match' });
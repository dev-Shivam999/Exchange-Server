import { z } from 'zod';

export const userSchemaZod = z.object({

    name: z.string().min(3, "name is required"),
    email: z.string().email(),
    password: z.string().min(5, "password is required 5 letter "),
    number: z.string().length(10, "number is required must be 10 ")
});

export type User = z.infer<typeof userSchemaZod>;


export const LoginSchema = z.object({
    email: z.string().email(),

    password: z.string().min(5, "password is required 5 letter ")
})
 
export const AddSchema = z.object({
    ProductName: z.string().trim().min(3, "product name is required"),
    ProductTittle:z.string().trim().min(5, "product name is required"),
    ProductPrice: z.string().trim().min(1, "price is required"),
    ProductType: z.string() ,
    ProductDiscretion: z.string().trim().min(20, "discretion is required 20 word"),
    District: z.string().trim().min(3, "District is required "),
    State: z.string().trim().min(3, "state is required")
})
export type UserLogin = z.infer<typeof LoginSchema>;
export type AddPro = z.infer<typeof AddSchema>;
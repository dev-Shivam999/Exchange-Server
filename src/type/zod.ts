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

  
    ProductPrice: z.string().trim().min(1, "price is required"),
    ProductDiscretion: z.string().trim().min(20, "discretion is required 20 word"),
    SubLoc: z.string().trim().min(3, "Sub Location is required "),
    })
export type UserLogin = z.infer<typeof LoginSchema>;
export type AddPro = z.infer<typeof AddSchema>;
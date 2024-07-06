import z from "zod"

export const SignupInput =z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(3),
})

export const LoginInput = z.object({
    userId : z.string(),
    password : z.string().min(3),
})

export type SignupInputType = z.infer<typeof SignupInput>
export type LoginInputType = z.infer<typeof LoginInput>

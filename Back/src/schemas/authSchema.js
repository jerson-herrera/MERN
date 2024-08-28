//Zod nos permite crear esquemas de validacion como en mongoose, pero esste caso validamos los datos recibidos.
import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
        })
        .min(4, "El username debe tener al menos 4 letras"),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Invalid email",
        }),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(4,{
            message:"El password debe tener un minimo de 6 caracteres",
        }),
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Invalid email",
        }),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(4, "El password debe tener un minimo de 6 caracteres"),
});

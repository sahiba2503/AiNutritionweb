//does not provide an export named 'loginSchema'
import {z} from "zod";
 export const forgetSchema = z.object({
  email:z 
  .string()
  .trim()
   .email("Please enter a valid email")
  .refine(
    (value)=>value.endsWith("@gmail.com"),
    "plese enter valid gmail"),

  password:z 
  .string()
  .trim()
  .min(8,"password length should be atleast 8 character")
  .max(12, "Password must be 8 to 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character")
    .regex(/^\S+$/, "Password should not contain space"),
})

 export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .refine(
      (value) => value.endsWith("@gmail.com"),
      "Please enter a valid Gmail address",
    ),

  password: z
    .string()
    .min(8, "Password must be 8 to 12 characters")
    .max(12, "Password must be 8 to 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character")
    .regex(/^\S+$/, "Password should not contain space"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be at least 3 characters")
     .regex(/^[A-Za-z ]+$/, "Name should contain only letters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .refine(
      (value) => value.endsWith("@gmail.com"),
      "Please enter a valid Gmail address",
    ),

  password: z
    .string()
    .min(8, "Password must be 8 to 12 characters")
    .max(12, "Password must be 8 to 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character")
    .regex(/^\S+$/, "Password should not contain space"),
});



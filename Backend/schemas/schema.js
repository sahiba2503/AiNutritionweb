
const {z} = require("zod");
const foodSchema = z.object({
  food: z.string().min(1, "Food is required"),
});

const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => value.endsWith("@gmail.com"),
      "Please enter a valid Gmail address",
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not be more than 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
});
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => value.endsWith("@gmail.com"),
      "Please enter a valid Gmail address",
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not be more than 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
});

module.exports = {
  foodSchema,
   createAccountSchema,
    loginSchema,

};

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
    firstName: (schema) => schema.min(1, "First name is required"),
    lastName: (schema) => schema.min(1, "First name is required"),
    address1: (schema) => schema.min(1, "Address is required"),
    city: (schema) => schema.min(1, "City is required"),
    state: (schema) => schema.length(1, "State is required"),
    email: (schema) => schema.email("Invalid email address"),
    zip: (schema) => schema.regex(/^\d{4}$/, "Invalid Zip code. Use 4 digits."),
    phone: (schema) =>
        schema.regex(
            /^\+36[1-9][0-9]{8}$/,
            "Invalid phone number format. Use +36XXXXXXXXX"
        ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;

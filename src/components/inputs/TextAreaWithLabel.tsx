"use client";

import { useFormContext } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TextareaHTMLAttributes } from "react";

type Props<S> = {
    fieldTitle: String;
    // This makes sure we can only provide
    // props that are properties of the generic type
    nameInSchema: keyof S & string;
    className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

// Generic S
export function TextAreaWithLabel<S>({
    fieldTitle,
    nameInSchema,
    className,
    ...props
}: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        className="text-base mb-2"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>

                    <FormControl>
                        <Textarea
                            id={nameInSchema}
                            className={className}
                            {...props}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

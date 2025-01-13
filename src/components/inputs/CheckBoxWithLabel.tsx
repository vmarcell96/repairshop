"use client";

import { useFormContext } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

import { Checkbox } from "@/components/ui/checkbox";

type Props<S> = {
    fieldTitle: String;
    // This makes sure we can only provide
    // props that are properties of the generic type
    nameInSchema: keyof S & string;
    message: string;
};

// Generic S
export function CheckBoxWithLabel<S>({
    fieldTitle,
    nameInSchema,
    message,
    ...props
}: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                    <FormLabel
                        className="text-base w-1/3 mt-2"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <div className="flex items-center gap-2">
                        <FormControl>
                            <Checkbox
                                id={nameInSchema}
                                {...field}
                                checked={field.value}
                                // custom element from shadcn so we have to delegate react hook form's onchange methed
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        {message}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

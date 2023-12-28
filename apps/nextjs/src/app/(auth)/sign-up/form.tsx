"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/;

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be minimum eight characters and at least one letter and one number",
    }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  const { pending } = useFormStatus();

  return (
    <div className="bg-background flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl">Create new account</h2>
      </div>
      <div className="px-4 sm:mx-auto sm:w-full sm:max-w-md md:p-0">
        <div className="rounded-lg px-2 py-4 shadow sm:px-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                toast.error("Api not configured");
              })}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button aria-disabled={pending} type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

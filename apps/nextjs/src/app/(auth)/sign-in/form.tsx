"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
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

type LoginFormProps = {
  performLogin: (values: { email: string; password: string }) => Promise<void>;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm({ performLogin }: LoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await performLogin(values);
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error(error.message);
      }
      toast.error("Something went wrong, please try again later.");
    }
  }

  return (
    <div className="bg-background flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl">Welcome Back</h2>
      </div>
      <div className="px-4 sm:mx-auto sm:w-full sm:max-w-md md:p-0">
        <div className="rounded-lg px-2 py-4 shadow sm:px-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

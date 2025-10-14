"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { useResetPassword } from "@/hooks/users";

const FormSchema = z.object({
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long",
  }),
  tokenParam: z.string(),
});

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  if (!tokenParam) {
    throw new Error("Missing token param in URL");
  }

  const { handleResetPassword, isLoading } = useResetPassword();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      tokenParam: tokenParam,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await handleResetPassword(data.tokenParam, data.password);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-full max-w-xs md:max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Please enter your new password to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[90%] space-y-6"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <div className="flex flex-col justify-between">
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

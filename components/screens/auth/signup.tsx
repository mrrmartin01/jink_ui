"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignup } from "@/hooks/auth/useSignup";

const signupFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userName: z.string().min(3, "Username is required"),
  displayName: z.string().min(3, "Display name is required"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export default function SignupPreview() {
  const { handleSignup, isLoading } = useSignup();
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      displayName: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    await handleSignup(values);
  }

  const nextStep = async () => {
    let isValid = true;
    if (step === 1) {
      isValid = await form.trigger(["email", "password"]);
    } else if (step === 2) {
      isValid = await form.trigger(["firstName", "lastName"]);
    } else if (step === 3) {
      isValid = await form.trigger(["userName", "displayName"]);
    }
    if (isValid && step < 3) {
      setStep(step + 1);
    } else if (isValid && step === 3) {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="mx-auto w-full max-w-[27rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Step {step} of 3: Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid gap-4">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="johndoe@mail.com"
                              type="email"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="******"
                              autoComplete="new-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="JohnD_1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isLoading}
                    className="ml-auto"
                  >
                    {step === 3 ? "Sign Up" : "Next"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
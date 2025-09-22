"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSearchParams, useParams } from "next/navigation";
import { useVerify } from "@/hooks/auth/useVerify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCountdown } from "@/hooks/useCounter";
import { useReVerify } from "@/hooks/auth/useReVerify";

const FormSchema = z.object({
  email: z.email().min(4, {
    message: "There was an error verifing your email",
  }),
  code: z.string().min(4, {
    message: "Your verification code must be 4 characters.",
  }),
});

export default function InputOTPForm() {
  const params = useParams<{ email: string }>();
  const searchParams = useSearchParams();
  const email = decodeURIComponent(params.email);
  const expiresTime = decodeURIComponent(searchParams.get("expires"));
  const { minutes, seconds, isExpired } = useCountdown(expiresTime);

  const { handleVerify, isLoading } = useVerify();
  const { handleReVerify, retryLoading } = useReVerify();
  console.log({ minutes, seconds, isExpired });
  console.log("expiry time =>", expiresTime);
  console.log("current time =>", new Date());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email,
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await handleVerify(data);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-full max-w-xs md:max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verification</CardTitle>
          <CardDescription>
            Please enter the 4 digits sent to your email to
          </CardDescription>
          {expiresTime && (
            <p className="mt-2 font-mono text-xs text-gray-400">
              {isExpired ? (
                <span className="text-red-600">Code expired</span>
              ) : (
                <>
                  Expires in {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </>
              )}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Verification code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={4} {...field} disabled={expiresTime}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="sr-only">
                      Please enter the code sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isExpired ? (
                <Button
                  variant="link"
                  className="mt-4"
                  onClick={() => handleReVerify({ email })}
                  disabled={isLoading}
                >
                  Resend code
                </Button>
              ) : (
                <Button type="submit" disabled={retryLoading}>
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

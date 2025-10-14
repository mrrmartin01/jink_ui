"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/types/user";
import { useEditUser } from "@/hooks/users";

const formSchema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .max(15, "Username must be 15 characters or less")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    )
    .transform((val) => val.toLowerCase())
    .optional(),
  displayName: z
    .string()
    .max(50, "Display name must be 50 characters or less")
    .optional(),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  location: z
    .string()
    .max(30, "Location must be 30 characters or less")
    .optional(),
  profession: z
    .string()
    .max(100, "Profession must be 100 characters or less")
    .optional(),
  firstName: z
    .string()
    .max(50, "First name must be 50 characters or less")
    .optional(),
  lastName: z
    .string()
    .max(50, "Last name must be 50 characters or less")
    .optional(),
});

export function EditProfile({ data }: { data: User }) {
  const { handleEditUser, isLoading } = useEditUser();
  const [bioLength, setBioLength] = useState(data.bio?.length || 0);
  const [userNameLength, setUserNameLength] = useState(
    data.userName?.length || 0,
  );
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: data.userName || "",
      displayName: data.displayName || "",
      bio: data.bio || "",
      website: data.website || "",
      location: data.location || "",
      profession: data.profession || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const defaultValues = form.formState.defaultValues ?? {};
    const patchData: Partial<z.infer<typeof formSchema>> = {};

    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof typeof values;
      const currentValue = values[typedKey];
      const originalValue = defaultValues[typedKey];
      if ((currentValue ?? "").trim() !== (originalValue ?? "").trim()) {
        patchData[typedKey] = currentValue;
      }
    });

    if (Object.keys(patchData).length === 0) {
      console.log("No changes detected");
      return;
    }

    const result = await handleEditUser(patchData);
    if (!result.success && result.suggestion) {
      setSuggestion(result.suggestion);
    } else {
      setSuggestion(null);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-gray-500 px-6 py-1.5 font-semibold transition-colors hover:bg-blue-800 hover:text-white"
        >
          Edit Profile
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col border-l border-gray-800 bg-gray-950 text-gray-100 sm:max-w-md">
        <SheetHeader className="mb-4 px-4">
          <SheetTitle className="text-lg font-extrabold text-gray-100">
            Edit Profile
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Update your profile details. Only changed fields will be saved.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-3 overflow-y-auto px-4"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="rounded-lg border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between text-xs text-gray-500">
                    <span>Max 50 characters</span>
                    <span>{field.value?.length || 0}/50</span>
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@username"
                      className="rounded-lg border-gray-700 bg-gray-900 lowercase text-gray-100 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      maxLength={15}
                      onChange={(e) => {
                        field.onChange(e);
                        setUserNameLength(e.target.value.length);
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  {suggestion && (
                    <FormDescription className="text-xs text-yellow-500">
                      Suggested username:{" "}
                      <span className="font-semibold">{suggestion}</span>
                    </FormDescription>
                  )}

                  <FormDescription className="flex justify-between text-xs text-gray-500">
                    <span>Letters, numbers, underscores</span>
                    <span>{userNameLength}/15</span>
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's your story?"
                      className="rounded-lg border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      maxLength={160}
                      onChange={(e) => {
                        field.onChange(e);
                        setBioLength(e.target.value.length);
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between text-xs text-gray-500">
                    <span>Max 160 characters</span>
                    <span>{bioLength}/160</span>
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City, Country"
                      className="rounded-lg border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      maxLength={30}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Max 30 characters
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="sticky bottom-0 mt-4 flex flex-row gap-3 border-t border-gray-800 bg-gray-950 px-4 py-3">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="w-full rounded-full border-gray-500 bg-transparent transition-colors hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
            disabled={isLoading || !form.formState.isDirty}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import { User } from "@/types/user";
import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ identifier, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: { identifier, password },
      }),
    }),
    verify: builder.mutation({
      query: ({ email, code }) => ({
        url: "/auth/verify",
        method: "POST",
        body: { email, code },
      }),
    }),
    reVerify: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/re-verify",
        method: "POST",
        body: { email },
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      }),
      keepUnusedDataFor: 0, // expire immediately after unsubscribed
    }),

    getUser: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
    }),

    signup: builder.mutation({
      query: ({
        userName,
        displayName,
        email,
        password,
        firstName,
        lastName,
      }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { userName, displayName, email, password, firstName, lastName },
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),

    //crud user
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ tokenParam, password }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { token: tokenParam, newPassword: password },
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useVerifyMutation,
  useReVerifyMutation,
  useRefreshQuery,
  useGetUserQuery,
  useSignupMutation,
  useSignoutMutation,

  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;

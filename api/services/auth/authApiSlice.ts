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
      query: ({ email,code }) => ({
        url: "/auth/verify",
        method: "POST",
        body: { email,code },
      }),
    }),
    reVerify: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/re-verify",
        method: "POST",
        body: { email },
      }),
    }),
    refresh: builder.mutation({
      query: ({ refreshToken }) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    retrieveUser: builder.query({
      query: () => "/users/me",
    }),
    signup: builder.mutation({
      query: ({ userName, displayName, email, password, firstName, lastName }) => ({
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
  }),
});

export const {
  useSigninMutation,
  useVerifyMutation,
  useReVerifyMutation,
  useRefreshMutation,
  useRetrieveUserQuery,
  useSignupMutation,
  useSignoutMutation,
} = authApiSlice;

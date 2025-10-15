import { User } from "@/types/user";
import { apiSlice } from "../apiSlice";
import { setAuth } from "@/api/features/auth/authSlice";
import { createImageMutationHandler } from "@/utils/updateUserCache";

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
    editUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApiSlice.util.updateQueryData("getUser", undefined, (draft) => {
            Object.assign(draft, data);
          }),
        );
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setAuth(response.user ?? response));
        } catch {
          patchResult.undo();
        }
      },
    }),

    postProfilePicture: builder.mutation({
      query: (formData) => ({
        url: "/users/profile-picture",
        method: "POST",
        body: formData,
      }),
      onQueryStarted: createImageMutationHandler("profile", false),
    }),

    deleteProfilePicture: builder.mutation({
      query: () => ({
        url: "/users/profile-picture",
        method: "DELETE",
      }),
      onQueryStarted: createImageMutationHandler("profile", true),
    }),

    postCoverPicture: builder.mutation({
      query: (formData) => ({
        url: "/users/cover-picture",
        method: "POST",
        body: formData,
      }),
      onQueryStarted: createImageMutationHandler("cover", false),
    }),

    deleteCoverPicture: builder.mutation({
      query: () => ({
        url: "/users/cover-picture",
        method: "DELETE",
      }),
      onQueryStarted: createImageMutationHandler("cover", true),
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
  
  useEditUserMutation,
  usePostProfilePictureMutation,
  useDeleteProfilePictureMutation,
  usePostCoverPictureMutation,
  useDeleteCoverPictureMutation,
} = authApiSlice;

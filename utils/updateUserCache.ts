/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types/user";
import { setAuth } from "@/api/features/auth/authSlice";
import { authApiSlice } from "@/api/services/auth/authApiSlice";

// Helper function to update cache and auth state
const updateUserCache = (dispatch: any, updateFn: (draft: User) => void) => {
  dispatch(
    authApiSlice.util.updateQueryData("getUser", undefined, (draft: User) => {
      updateFn(draft);
    }),
  );

  dispatch(
    authApiSlice.util.updateQueryData("getUser", undefined, (draft: User) => {
      dispatch(
        setAuth({
          id: draft.id ?? null,
          userName: draft.userName ?? null,
          displayName: draft.displayName ?? null,
          profileImage: draft.profileImageUrl ?? null,
        }),
      );
    }),
  );
};

// Helper function to create image mutation handlers
export const createImageMutationHandler = (
  imageType: "profile" | "cover",
  isDelete: boolean = false,
) => {
  const imageField =
    imageType === "profile" ? "profileImageUrl" : "coverImageUrl";
  const responseKey = imageType === "profile" ? "profileImage" : "coverImage";

  return async (
    _: unknown,
    {
      dispatch,
      queryFulfilled,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      dispatch: Function;
      queryFulfilled: Promise<{ data: any }>;
    },
  ) => {
    try {
      const { data: response } = await queryFulfilled;

      updateUserCache(dispatch, (draft) => {
        draft[imageField] = isDelete ? null : response[responseKey];
      });
    } catch {}
  };
};
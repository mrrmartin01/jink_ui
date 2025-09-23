import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logout, setAuth } from "../features/auth/authSlice";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  credentials: "include",
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: "/auth/refresh/", method: "POST" },
          api,
          extraOptions,
        );

      if (refreshResult.data) {
        const me = await baseQuery({ url: "/users/me" }, api, extraOptions);
        if (me?.data) {
          api.dispatch(setAuth(me.data));
        }
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }
}

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

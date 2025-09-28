"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/api/reduxHook";
import { setAuth, finishInitialLoad } from "@/api/features/auth/authSlice";
import { useRefreshQuery } from "@/api/services/auth/authApiSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const { data, isError, isSuccess } = useRefreshQuery(undefined, {
    skip: !isLoading,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setAuth(data.user));
    }
    
    if (isSuccess || isError) {
      dispatch(finishInitialLoad());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}

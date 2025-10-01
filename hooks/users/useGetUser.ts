import { useGetUserQuery } from "@/api/services/auth/authApiSlice";

export const useGetUser = () => {
  const { data: user, isLoading, isError } = useGetUserQuery();
  return { user, isLoading, isError };
};

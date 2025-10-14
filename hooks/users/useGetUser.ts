import { useGetUserQuery } from "@/api/services/auth/authApiSlice";

const useGetUser = () => {
  const { data: user, isLoading, isError } = useGetUserQuery();
  return { user, isLoading, isError };
};

export default useGetUser;


import { logout } from "@/api/features/auth/authSlice";
import { useAppDispatch } from "@/api/reduxHook";
import { useSignoutMutation } from "@/api/services/auth/authApiSlice";

export const Signout = () => {
  const dispatch = useAppDispatch();
  const [signout, {isLoading}] = useSignoutMutation();

    const handleSignout = async () => {
    try {
      await signout({}).unwrap(); 
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      dispatch(logout());
    }
  };

  return {handleSignout, isLoading}
}
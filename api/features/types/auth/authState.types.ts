export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: string | null;
    userName: string | null;
    displayName: string | null;
  } | null;
}

import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { clearSession } from "../lib";
import { authApi } from "../api";

export function useSession() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("The server was unable to end the session.", err);
    } finally {
      clearSession();
      queryClient.removeQueries();
      await router.navigate({ to: "/login" });
    }
  };

  return { logout };
}

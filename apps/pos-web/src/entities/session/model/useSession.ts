import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { clearSession } from "../lib";

export function useSession() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    clearSession();
    queryClient.clear();
    await router.navigate({ to: "/login" });
  };

  return { logout };
}
